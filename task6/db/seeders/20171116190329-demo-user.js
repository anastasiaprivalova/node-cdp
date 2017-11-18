const users = require('./../data/users');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', users.data, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};