# kinode-scraper

Get today's movie schedules for a cinemas listed on kino.de in JSON format.

Motivation: I moved to a neighbourhood in which quite a few small independent cinemas are located.
So instead of looking up schedules for every cinema manually I wanted to have a daily schedule of the cinemas close to my appartment.

Since I couldn't find any appropriate API providing the data i needed I chose to scrape it from kino.de (some may find it quite a heavy/slow website 💅) via puppeteer, so it may take a while to gather all information from it - depending on the list of pages to scrape. 🙈

Resulting data can either be used and processed in other JS modules (through CommonJS) or written into a JSON file on hard disk (easiest via CLI command).

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

<!-- By Omitting the output argument results.json should be stored into ./dist -->

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