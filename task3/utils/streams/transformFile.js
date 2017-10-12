const fs = require('fs');
const path = require('path');
const through = require('through2');
const split = require('split');

function transformFile(filePath, useOutput) {
  const absolutePath = path.resolve(__dirname, filePath);
  const csvSeparator = ',';
  let headers = [];
  let writer, isNotFirst;

  const write = function(buffer, encoding, next) {
    const bufferString = buffer.toString();
    let row, obj;

    if(bufferString) {
      if(headers.length) {
        row = bufferString.split(csvSeparator);
        obj = {};

        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        this.push(`${isNotFirst ? ',' : ''}${JSON.stringify(obj)}`);
        isNotFirst = true;
      } else {
        headers = buffer.toString().split(csvSeparator);
      }
    }
    next();
  };

  const end = function(done) {
    if(!useOutput) {
      writer.write(']}');
      writer.end();
    }
    done();
  };

  if(fs.existsSync(absolutePath)) {
    const reader = fs.createReadStream(absolutePath);
    const transformStream = through(write, end);

    if(useOutput) {
      reader.pipe(split()).pipe(transformStream).pipe(process.stdout);
    } else {
      const parsedPath = path.parse(absolutePath);
      const dirPath = parsedPath.dir;
      const jsonName = parsedPath.name;

      writer = fs.createWriteStream(`${dirPath}/${jsonName}.json`);
      writer.write('{"data": [');
      reader.pipe(split()).pipe(transformStream).pipe(writer);
    }
  } else {
    console.error(`Not found ${absolutePath}`);
  }
}

module.exports = transformFile;