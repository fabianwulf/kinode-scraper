const fs = require('fs');
const mkdir = require('mkdirp');
const defaults = require('./defaults');

module.exports = function (path, data) {
  path = path || defaults.outDir;
  let fileName;

  if (path.indexOf('/') >= 0) {
    if (path.indexOf('.json') > 0) {
      fileName = path.substring(path.lastIndexOf('/') + 1, path.length);
      path = path.substring(0, path.lastIndexOf('/'));
    }
  } else {
    if (path.indexOf('.json') > 0) {
      fileName = path.substring(0, path.length);
      path = '.';
    }
  }

  fileName = `${path || defaults.outDir}/${fileName || defaults.outFile}`;

  mkdir.sync(path);
  fs.writeFileSync(fileName, JSON.stringify(data), 'utf-8');
}