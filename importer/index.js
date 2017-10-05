const fs = require('fs');
const pathLib = require('path');
const csv = require('csvtojson');
const dirwatcher = require('./../dirwatcher');

class Importer {
  constructor(dir, delay) {
    let index;
    let fullPath = __dirname + dir;
    let jsonDir = 'jsonData';
    let eventEmitter = new dirwatcher().watch(fullPath, delay);

    this.paths = [];

    let filePromise = new Promise((resolve, reject) => {
      fs.readdir(fullPath, (error, files) => {
        if(error) {
          reject(error);
        } else {
          resolve(files);
        }
      });
    });

    filePromise.then((files) => {
      let arrayOfPromises = files.map(file => {
        return this.importAsync(pathLib.resolve(fullPath, file));
      });

      return Promise.all(arrayOfPromises);
    }).then(data => {
      data.forEach(file => {
        this.paths.push(file.path);
        writeJSON(file, jsonDir);
      });
    }).catch(error => {
      console.error(error);
    });

    eventEmitter.on('dirwatcher:changed', (event, path) => {
      switch(event) {
        case 'add':
          // only for watchWithChokidar
          this.importAsync(path).then((result) => {
            this.paths.push(path);
            writeJSON(result, jsonDir);
            console.log('ADDED:', path);
          }).catch((error) => {
            console.error(error);
          });
          break;

        case 'change':
          index = this.paths.indexOf(path);

          if(index !== -1) {
            this.importAsync(path).then((result) => {
              writeJSON(result, jsonDir);
              console.log('CHANGED:', path);
            }).catch((error) => {
              console.error(error);
            });
          }

          break;

        case 'rename':
          // only for watch with fs.watch
          index = this.paths.indexOf(path);

          if(index === -1) {
            this.importAsync(path).then((result) => {
              this.paths.push(path);
              writeJSON(result, jsonDir);
              console.log('ADDED:', path);
            }).catch((error) => {
              console.error(error);
            });
          } else {

            if(fs.existsSync(path)) {
              this.importAsync(path).then((result) => {
                writeJSON(result, jsonDir);
                console.log('CHANGED:', path);
              }).catch((error) => {
                console.error(error);
              });
            } else {
              let tempData = this.paths;
              this.paths = tempData.slice(0, index).concat(tempData.slice(index + 1));
              let jsonPath = pathLib.resolve(fullPath, `../${jsonDir}`, `${pathLib.parse(path).name}.json`);

              removeJSON(jsonPath);
            }
          }

          break;

        case 'unlink':
          // only for watchWithChokidar
          index = this.paths.indexOf(path);

          if(index !== -1) {
            let tempData = this.paths;
            this.paths = tempData.slice(0, index).concat(tempData.slice(index + 1));
            let jsonPath = pathLib.resolve(fullPath, `../${jsonDir}`, `${pathLib.parse(path).name}.json`);

            removeJSON(jsonPath);
          }

          break;
      }
    });
  }

  importAsync(path) {
    return new Promise((resolve, reject) => {
      csv()
        .fromFile(path)
        .on('end_parsed', (jsonArrObj) => {
          resolve({data: jsonArrObj, path: path});
        })
        .on('done', (error) => {
          if(error) {
            reject(error);
          }
        });
    });
  }

  importSync(path) {
    const stringFromBuffer = Buffer.from(fs.readFileSync(path)).toString();
    const valuesArray = stringFromBuffer.split('\n');
    const csvSeparator = ',';
    const headers = valuesArray[0].split(csvSeparator);
    let resultingJSON = {
      'data': []
    };
    let row, obj;

    for(let i = 1; i < valuesArray.length; i++ ) {
      row = valuesArray[i].split(csvSeparator);
      obj = {};

      headers.forEach((header, index) => {
        obj[header] = row[index];
      });

      resultingJSON.data.push(obj);
    }

    return resultingJSON;
  }
}

function writeJSON(file, dirName) {
  const jsonName = `${pathLib.parse(file.path).name}.json`;
  let jsonFile;

  if(!fs.existsSync(dirName)) {
    fs.mkdir(dirName);
  }

  jsonFile = fs.createWriteStream(`${dirName}/${jsonName}`);
  jsonFile.write(JSON.stringify(file.data));
  jsonFile.end();
}

function removeJSON(jsonPath) {
  if(fs.existsSync(jsonPath)) {
    fs.unlink(jsonPath, () => {
      console.log('REMOVED:', jsonPath);
    });
  }
}

module.exports = Importer;