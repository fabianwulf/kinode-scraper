'use strict';

const fs = require('fs');
const puppeteer = require('puppeteer');
const writeToFile = require('./writetofile');
const fetchMoviesByCinema = require('./fetchmovies');

async function scrape(config, outPath) {
  const cinemaMap = JSON.parse(fs.readFileSync(config, 'utf-8'));
  const browser = await puppeteer.launch();
  const cinemas = Object.keys(cinemaMap);
  const data = await Promise.all(await cinemas.map(async (cinema) => {
    const todaysProgramme = await fetchMoviesByCinema(browser, cinema, cinemaMap[cinema]);
    return todaysProgramme;
  }));
  await browser.close();
  writeToFile(outPath, data);
}

module.exports = scrape;