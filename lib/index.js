"use strict";

const fetchMoviesByCinema = require("./fetchmovies");

async function scrape(cinemaMap, outPath) {
  const cinemas = Object.keys(cinemaMap);
  return await Promise.all(
    await cinemas.map(
      async cinema => await fetchMoviesByCinema(cinema, cinemaMap[cinema])
    )
  );
}

module.exports = scrape;
