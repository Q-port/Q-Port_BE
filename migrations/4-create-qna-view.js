'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('qnaViews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ip: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      questionId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('qnaViews');
  },
};
