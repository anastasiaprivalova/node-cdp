const data = require('./config');
const models = require('./models');

console.log(data.name);
let user = new models.User();
let product = new models.Product();