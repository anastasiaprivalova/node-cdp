const fs = require('fs');
const csv = require('csvtojson');
const dirwatcher = require('./../dirwatcher');

class Importer {
  constructor(dir, delay) {
    let index;
    let fullPath = __dirname + dir;
    let eventEmitter = new dirwatcher().watch(fullPath, delay);

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
        return this.importAsync(fullPath + '/' + file);
      });
      return Promise.all(arrayOfPromises);
    }).then(data => {
      this.csvData = data;
    }).catch(error => {
      console.error(error);
    });

    this.csvData = [];

    eventEmitter.on('dirwatcher:changed', (event, path) => {
      switch(event) {

        case 'add':
          this.importAsync(path).then((result) => {
            this.csvData.push(result);
            console.dir(this.csvData);
          }).catch((error) => {console.error(error);});
          break;

        case 'change':
          index = this.csvData.findIndex(element => element.path === path);

          if(index !== -1) {
            this.importAsync(path).then((result) => {
              this.csvData[index] = result;
              console.dir(this.csvData);
            }).catch((error) => {console.error(error);});
          }

          break;

        case 'unlink':
          index = this.csvData.findIndex(element => element.path === path);

          if(index !== -1) {
            let tempData = this.csvData;
            this.csvData = tempData.slice(0, index).concat(tempData.slice(index + 1));
            console.dir(this.csvData);
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

module.exports = Importer;