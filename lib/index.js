'use strict';

const puppeteer = require('puppeteer');
const writeToFile = require('./writetofile');
const fetchMoviesByCinema = require('./fetchmovies');

async function scrape(cinemaMap, outPath) {
  const browser = await puppeteer.launch();
  const cinemas = Object.keys(cinemaMap);
  const data = await Promise.all(await cinemas.map(async (cinema) => {
    const todaysProgramme = await fetchMoviesByCinema(browser, cinema, cinemaMap[cinema]);
    return todaysProgramme;
  }));

  await browser.close();
  
  if (outPath) {
    writeToFile(outPath, data);
  } else {
    return data;
  }
}

module.exports = scrape;