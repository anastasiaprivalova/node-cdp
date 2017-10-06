const importer = require('./importer');
const dirwatcher = require('./dirwatcher');

(() => {
  let fullPath = __dirname + '/data';
  let csvImporter;
  let csvData;

  dirwatcher.watch(fullPath, 100);
  csvImporter = new importer('./../data');
  csvData = csvImporter.importSync('./task2/data/MOCK_DATA.csv');
  console.log(csvData);
})();