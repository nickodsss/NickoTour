'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      itinerary: {
        type: Sequelize.TEXT
      },
      pax: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      airlines: {
        type: Sequelize.STRING
      },
      imgUrl: {
        type: Sequelize.TEXT
      },
      linkNews: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tours');
  }
};