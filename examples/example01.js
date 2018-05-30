const scraper = require('kinode-scraper');

(async () => {
  
  const cinemasToScrape = { 'Moviemento': 'https://www.kino.de/kinoprogramm/stadt/berlin/stadtteil/kreuzberg/kino/moviemento-kino-in-berlin/' };
  const results = await scraper(cinemasToScrape);
  console.info(JSON.stringify(results));

})()