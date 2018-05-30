const Xray = require('x-ray');

const todaysMoviesSelector = ".cinema-movies.active .cinema-movie";
const movieTitleSelector = ".card-link";
const movieTimesSelector = ".schedule-time a";

const x = Xray({
  filters: {
    trim(value) {
      return typeof value === 'string' ? value.trim() : value
    }
  }
});

module.exports = async function (cinema, scheduleURL) {

  return new Promise(async (resolve, reject) => {

    const onComplete = (err, obj) => {
      if (err) {
        console.warn(`\nCould not fetch schedule for ${cinema}..`);
        reejct(err)
      }
      resolve({
        name: cinema,
        url: scheduleURL,
        ...obj
      });
    };

    x(scheduleURL, {
      movies: x(todaysMoviesSelector, [{
        title: movieTitleSelector,
        url: `${movieTitleSelector}@href`,
        times: [`${movieTimesSelector} | trim`]
      }])
    })(onComplete);
    
  });
};
