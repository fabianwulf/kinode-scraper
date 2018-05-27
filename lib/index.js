'use strict';

const writeToFile = require('./writetofile');
const fetchMoviesByCinema = require('./fetchmovies');

async function scrape(cinemaMap, outPath) {
  const cinemas = Object.keys(cinemaMap);
  const data = await Promise.all(
    await cinemas.map(
      async (cinema) => await fetchMoviesByCinema(cinema, cinemaMap[cinema])
    )
  );

  if (outPath) {
    return writeToFile(outPath, data);
  } else {
    return data;
  }
}

module.exports = scrape;