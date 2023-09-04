'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'UserId' })
      Cart.belongsTo(models.Tour, { foreignKey: 'TourId' })
    }
  }
  Cart.init({
    UserId: DataTypes.INTEGER,
    TourId: DataTypes.INTEGER,
    totalPerson: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};