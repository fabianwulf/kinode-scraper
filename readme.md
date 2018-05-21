# kinode-scraper

Get today's times schedules for a cinemas listed on kino.de.

## Install

Install globally
```
npm i kinode-scraper -g
```

Install locally
```
npm i kinode-scraper
```

## Usage
```
const scraper = require('kinode-scraper');

(async () => {

  const cinemasToScrape = {
    'Bundesplatz Kino': 'https://www.kino.de/kinoprogramm/stadt/berlin/stadtteil/wilmersdorf/kino/bundesplatz-kino/'
  };

  const results = await scraper(cinemasToScrape, output);

  console.info(results);
})()
```