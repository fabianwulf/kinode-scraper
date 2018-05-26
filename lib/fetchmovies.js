const puppeteer = require('puppeteer');
const PAGE_LOAD_TIMEOUT = 60000;

const todaysMoviesSelector = ".cinema-movies.active .cinema-movie";
const movieTitleSelector = ".card-link";
const movieTimesSelector = ".schedule-time a";

module.exports = async function (cinema, scheduleURL) {

  const browser = await puppeteer.launch();
  const tearDown = async function () {
    try {
      await browser.close();
    } catch (err) {
      console.error(`Could not close browser properly: ${err.message}`);
      throw err;
    }
  };

  return new Promise(async (resolve, reject) => {
    const page = await browser.newPage();
    const infos = {
      name: cinema,
      url: scheduleURL,
      movies: []
    };

    try {
      await page.goto(scheduleURL, { timeout: PAGE_LOAD_TIMEOUT });
    } catch (err) {
      await tearDown();
      reject(err);
    }

    try {
      await page.waitForSelector(todaysMoviesSelector);
      const $movieElements = await page.$$(todaysMoviesSelector);

      infos.movies = await Promise.all(
        await $movieElements.map(async $elem => {
          const movie = await $elem.$eval(movieTitleSelector, elem => {
            return {
              title: elem.innerText,
              url: elem.href
            };
          });
          const $times = await $elem.$$(movieTimesSelector);
          const times = await Promise.all(
            await $times.map(async timeHandle => {
              const time = await page.evaluate(
                time => time.innerText,
                timeHandle
              );
              return time;
            })
          );
          return {
            ...movie,
            times
          };
        })
      );
    } catch (err) {
      console.warn(`\Wath out: No schedule present for ${cinema}..`);
    }
    await tearDown();
    resolve(infos);
  });
};
