'use strict';

const puppeteer = require('puppeteer');

const config = require('./config').cinemas;
const todaysMoviesSelector = ".cinema-movies.active .cinema-movie";
const movieTitleSelector = ".card-link";
const movieTimesSelector = ".schedule-time a";

async function fetchMoviesAtCinema(browser, cinema, scheduleURL) {
  return new Promise(async (resolve, reject) => {
    const page = await browser.newPage();
    await page.goto(scheduleURL);

    await page.waitForSelector(todaysMoviesSelector);
    const $movieElements = await page.$$(todaysMoviesSelector);
    let infos = {
      name: cinema,
      url: scheduleURL,
      movies: []
    };

    infos.movies = await Promise.all(await $movieElements.map(async ($elem) => {
      const title = await $elem.$eval(movieTitleSelector, (elem) => elem.innerText);
      const $times = await $elem.$$(movieTimesSelector)
      const times = await Promise.all(await $times.map(async (timeHandle) => {
        const html = await page.evaluate(time => time.innerText, timeHandle);
        return html;
      }));
      return { title, times };
    }));
    resolve(infos);
  });
}

(async () => {
  const browser = await puppeteer.launch();
  const cinemas = Object.keys(config);
  const data = await Promise.all(await cinemas.map(async (cinema) => {
    const todaysProgramme = await fetchMoviesAtCinema(browser, cinema, config[cinema]);
    return todaysProgramme;
  }));
  console.log(JSON.stringify(data));
  await browser.close();
})();
