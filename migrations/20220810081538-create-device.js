'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      modelType: {
        type: Sequelize.STRING
      },
      machineId: {
        type: Sequelize.STRING
      },
      operatorName: {
        type: Sequelize.STRING
      },
      isDualSim: {
        type: Sequelize.BOOLEAN
      },
      phoneNumber: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Devices');
  }
};