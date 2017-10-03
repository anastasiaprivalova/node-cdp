const data = require('./config');
const models = require('./models');
const importer = require('./importer');

console.log(data.name);
let user = new models.User();
let product = new models.Product();

let csvImporter = new importer('./../data', 100);
let csvData = csvImporter.importSync('./data/MOCK_DATA.csv');
console.log(csvData);