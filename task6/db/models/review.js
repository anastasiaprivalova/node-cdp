module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Review', {
    reviewId: DataTypes.STRING,
    userId: DataTypes.STRING,
    productId: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
};