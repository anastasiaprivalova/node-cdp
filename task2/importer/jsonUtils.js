const fs = require('fs');
const path = require('path');

function writeJSON(file, dirName) {
  const jsonName = `${path.parse(file.path).name}.json`;
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

function csvStringToJson(string, separator = ',') {
  const valuesArray = string.split('\n');
  const headers = valuesArray[0].split(separator);
  let resultingJSON = {
    'data': []
  };
  let row, obj;

  for(let i = 1; i < valuesArray.length; i++ ) {
    row = valuesArray[i].split(separator);
    obj = {};

    headers.forEach((header, index) => {
      obj[header] = row[index];
    });

    resultingJSON.data.push(obj);
  }

  return resultingJSON;
}

module.exports = {
  writeJSON,
  removeJSON,
  csvStringToJson
};