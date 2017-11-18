const reviews = require('./../data/reviews');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Reviews', reviews.data, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Reviews', null, {})
};