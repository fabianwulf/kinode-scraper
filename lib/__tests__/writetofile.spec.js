const fs = require('fs');
const rimraf = require('rimraf');
const writeToFile = require('../writetofile');
const defaults = require('../defaults');

describe('writetofile', () => {

  afterEach(() => {
    rimraf.sync('dist');
  })

  it('should be written to given path and filename', () => {
    const outPath = 'dist/test1/results.json';
    writeToFile(outPath, {});
    expect(fs.existsSync(outPath)).toBe(true);
  });

  it('should fallback to default filename if output does not define json file', () => {
    writeToFile('dist/test2', {});
    const defaultExists = fs.existsSync(`dist/test2/${defaults.outFile}`);
    expect(defaultExists).toBe(true);
  });

  it('should fallback to default path and filename if no output is given', () => {
    writeToFile(undefined, {});
    const defaultExists = fs.existsSync(`${defaults.outDir}/${defaults.outFile}`);
    expect(defaultExists).toBe(true);
  });

});