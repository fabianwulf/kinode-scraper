# 🍿 kinode-scraper

Small pet project fetching today's movie schedules for cinemas listed on [kino.de](https://kino.de).

Motivation: I moved to a neighbourhood having a small number of nice independent cinemas around. So instead of looking up schedules for every cinema I wanted to have something like a daily schedule for the ones close to the place I live.

🙈 Since I couldn't find any appropriate API providing the data i needed I chose to scrape it from kino.de (some may find it quite a heavy website 💅) by [Puppeteer](https://github.com/GoogleChrome/puppeteer), so it may take a while to gather all information from it - depending on the list of pages to scrape.

This library can either be used by CommonJS imports within JavaScript modules to fetch and process mentioned data or by CLI command which stores the results into a JSON file somewhere on hard disk.

## Install
---

Install globally
```
npm i kinode-scraper -g
```

Install locally
```
npm i kinode-scraper
```

## Usage
---

### Via Command line interface
```
kinode-scraper -c ./path/to/config.json -o ./path/to/output/folder/results.json
```
where the config file is just a map of URLs to cinemas listed on kino.de, e.g.

```
{
  "Moviemento": "https://www.kino.de/kinoprogramm/stadt/berlin/stadtteil/kreuzberg/kino/moviemento-kino-in-berlin/",
  ...
}
```

### Via CommonJS
```
const scraper = require('kinode-scraper');

(async () => {

  const cinemasToScrape = {
    'Moviemento': 'https://www.kino.de/kinoprogramm/stadt/berlin/stadtteil/kreuzberg/kino/moviemento-kino-in-berlin/'
  };

  const results = await scraper(cinemasToScrape);

  console.info(results);
})()
```