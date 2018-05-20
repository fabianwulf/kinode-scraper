'use strict';

const fs = require('fs');
const mkdir = require('mkdirp');
const puppeteer = require('puppeteer');
const config = require('./config');

const PAGE_LOAD_TIMEOUT = 60000;

const todaysMoviesSelector = ".cinema-movies.active .cinema-movie";
const movieTitleSelector = ".card-link";
const movieTimesSelector = ".schedule-time a";

async function fetchMoviesAtCinema(browser, cinema, scheduleURL) {
  return new Promise(async (resolve, reject) => {
    const page = await browser.newPage();
    try {
      await page.goto(scheduleURL, {timeout: PAGE_LOAD_TIMEOUT});
    } catch(err) {
      console.log('Error happened: ' + err.message);
    }
    
    await page.waitForSelector(todaysMoviesSelector);
    const $movieElements = await page.$$(todaysMoviesSelector);
    let infos = {
      name: cinema,
      url: scheduleURL,
      movies: []
    };

    infos.movies = await Promise.all(await $movieElements.map(async ($elem) => {
      const title = await $elem.$eval(movieTitleSelector, (elem) => elem.innerText);
      const $times = await $elem.$$(movieTimesSelector);
      const times = await Promise.all(await $times.map(async (timeHandle) => {
        const time = await page.evaluate(time => time.innerText, timeHandle);
        return time;
      }));
      return { title, times };
    }));
    resolve(infos);
  });
}

function writeToFile(path, data) {
  mkdir.sync(path.substring(0,path.lastIndexOf('/')));
  fs.writeFile(config.outFile, JSON.stringify(data), 'utf-8', (err) => {
    if (err) throw err;
    console.log(`Data written to ${config.outFile}.`);
  });
}

(async () => {
  const browser = await puppeteer.launch();
  const cinemas = Object.keys(config.cinemas);
  const data = await Promise.all(await cinemas.map(async (cinema) => {
    const todaysProgramme = await fetchMoviesAtCinema(browser, cinema, config.cinemas[cinema]);
    return todaysProgramme;
  }));
  await browser.close();
  writeToFile(config.outFile, data);
})();
