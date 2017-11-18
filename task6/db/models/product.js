module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    name: DataTypes.STRING,
    productId: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
};