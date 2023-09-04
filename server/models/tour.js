'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tour.hasMany(models.Cart, { foreignKey: 'TourId' })
      Tour.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: 'TourId',
        otherKey: 'UserId'
      })
    }
  }
  Tour.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    itinerary: DataTypes.TEXT,
    pax: DataTypes.INTEGER,
    price: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    airlines: DataTypes.STRING,
    imgUrl: DataTypes.TEXT,
    linkNews: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};