/* eslint-disable */
require('babel-register');
/* eslint-enable */
const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const dbConnection = require('./api/db');
module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  dbConnection.connection.then((db) => {
    console.log('Connected to db');
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 8080;
  app.listen(port);
});
