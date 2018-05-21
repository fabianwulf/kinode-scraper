const fs = require('fs');
const mkdir = require('mkdirp');
const defaults = require('./defaults');

module.exports = function (path, data) {
  path = path || defaults.outDir;
  let fileName;
  if (path.indexOf('.json') > 0) {
    fileName = path.substring(path.lastIndexOf('/') + 1, path.length);
    path = path.substring(0, path.lastIndexOf('/'));
  }
  fileName = `${path}/${fileName || defaults.outFile}`;
  mkdir.sync(path);

  try {
    fs.writeFileSync(fileName, JSON.stringify(data), 'utf-8');
  } catch (err) {
    throw err;
  }
  console.log(`Data written to ${fileName}.`);
}