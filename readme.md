# 🍿 kinode-scraper

Small pet project to fetch today's movie schedules for cinemas listed on [kino.de](https://kino.de).

Motivation: I moved to a neighbourhood has a number of small independent cinemas around, so instead of looking up schedules for every cinema manually I wanted to have a daily schedule of the cinemas close to the place I live.

🙈 Since I couldn't find any appropriate API providing the data i needed I chose to scrape it from kino.de (some may find it quite a heavy website 💅) by [Puppeteer](https://github.com/GoogleChrome/puppeteer), so it may take a while to gather all information from it - depending on the list of pages to scrape.

Resulting data could either be used and processed in other JS modules (through CommonJS) or written into a JSON file on hard disk (easiest via CLI command).

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
  "Bundesplatz Kino": "https://www.kino.de/kinoprogramm/stadt/berlin/stadtteil/wilmersdorf/kino/bundesplatz-kino/",
  ...
}
```

### Via CommonJS
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