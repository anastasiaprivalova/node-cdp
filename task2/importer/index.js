const fs = require('fs');
const pathLib = require('path');
const csv = require('csvtojson');
const dirwatcher = require('./../dirwatcher');
const jsonUtils = require('./jsonUtils');

class Importer {
  constructor(dir) {
    let fullPath = __dirname + dir;
    let jsonDir = 'task2/jsonData';

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
        jsonUtils.writeJSON(file, jsonDir);
      });
    }).catch(error => {
      console.error(error);
    });

    dirwatcher.eventEmitter.on('dirwatcher:changed', (event, path) => {
      let index = this.paths.indexOf(path);
      let eventType = event;

      if(event === 'rename') {
        if(index === -1) {
          eventType = 'add';
        } else if(fs.existsSync(path)) {
          eventType = 'change';
        } else {
          eventType = 'unlink';
        }
      }

      switch(eventType) {
        case 'add':
          this.importAsync(path).then((result) => {
            this.paths.push(path);
            jsonUtils.writeJSON(result, jsonDir);
            console.log('ADDED:', path);
          }).catch((error) => {
            console.error(error);
          });
          break;

        case 'change':
          index = this.paths.indexOf(path);

          if(index !== -1) {
            this.importAsync(path).then((result) => {
              jsonUtils.writeJSON(result, jsonDir);
              console.log('CHANGED:', path);
            }).catch((error) => {
              console.error(error);
            });
          }

          break;

        case 'unlink':
          index = this.paths.indexOf(path);

          if(index !== -1) {
            let tempData = this.paths;
            let jsonPath = pathLib.resolve(fullPath, `../../${jsonDir}`, `${pathLib.parse(path).name}.json`);
            this.paths = tempData.slice(0, index).concat(tempData.slice(index + 1));

            jsonUtils.removeJSON(jsonPath);
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
    return jsonUtils.csvStringToJson(stringFromBuffer, ',');
  }
}

module.exports = Importer;