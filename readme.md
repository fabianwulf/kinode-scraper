# 🍿 kinode-scraper

Small pet project fetching today's movie schedules for cinemas listed on [kino.de](https://kino.de).

Motivation: I moved to a neighbourhood having a small number of nice independent cinemas around. So instead of looking up schedules for every cinema I wanted to have something like a daily schedule for the ones close to the place I live.

🙈 Since I couldn't find any appropriate API providing the data i needed I chose to scrape it from kino.de by the nifty scraping lib [x-ray](https://github.com/matthewmueller/x-ray).

This library can either be used by CommonJS imports within JavaScript modules to fetch and process mentioned data or by CLI command which stores the results into a JSON file somewhere on hard disk.

## Dependencies
- Node >= 8.3.0

## Install
---

Install globally
```
npm i https://github.com/fabianwulf/kinode-scraper.git -g
```

Install locally
```
npm i https://github.com/fabianwulf/kinode-scraper.git
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
  "Moviemento": "https://www.kino.de/kinoprogramm/stadt/berlin/stadtteil/kreuzberg/...",
  ...
}
```

### Via CommonJS
```
const scraper = require('kinode-scraper');

(async () => {

  const cinemasToScrape = {
    'Moviemento': 'https://www.kino.de/kinoprogramm/stadt/berlin/stadtteil/...'
  };

  const results = await scraper(cinemasToScrape);

  console.info(results);
})()
```

#### Result example:
```
[
  {
    "name": "Moviemento",
    "url": "https://www.kino.de/kinoprogramm/stadt/berlin/stadtteil/...",
    "movies":[
      { 
        "title": "A Beautiful Day",
        "url": "https://www.kino.de/film/a-beautiful-day-2017/",
        "times": ["23:15"]
      },
      {
        "title": "Lady Bird",
        "url": "https://www.kino.de/film/lady-bird-2017/",
        "times": ["12:00"]
      }
    ]
  }
]
```