const PAGE_LOAD_TIMEOUT = 60000;

const todaysMoviesSelector = ".cinema-movies.active .cinema-movie";
const movieTitleSelector = ".card-link";
const movieTimesSelector = ".schedule-time a";

module.exports = async function (browser, cinema, scheduleURL) {
  return new Promise(async (resolve, reject) => {
    const page = await browser.newPage();
    try {
      await page.goto(scheduleURL, { timeout: PAGE_LOAD_TIMEOUT });
    } catch (err) {
      console.error('Uh oh, this went wrong: ' + err.message);
    }

    await page.waitForSelector(todaysMoviesSelector);
    const $movieElements = await page.$$(todaysMoviesSelector);
    let infos = {
      name: cinema,
      url: scheduleURL,
      movies: []
    };

    infos.movies = await Promise.all(await $movieElements.map(async ($elem) => {
      const title = await $elem.$eval(movieTitleSelector, (elem) => elem.innerText);
      const $times = await $elem.$$(movieTimesSelector);
      const times = await Promise.all(await $times.map(async (timeHandle) => {
        const time = await page.evaluate(time => time.innerText, timeHandle);
        return time;
      }));
      return { title, times };
    }));
    resolve(infos);
  });
}