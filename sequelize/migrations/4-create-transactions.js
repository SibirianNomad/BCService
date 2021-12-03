'use strict';
const DataTypes = require('sequelize').DataTypes;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      amount:{
        type: Sequelize.FLOAT
      },
      status:{
        type: Sequelize.BOOLEAN
      },
      event:{
        type: Sequelize.STRING
      },
      transaction_hash:{
        type: Sequelize.STRING,
        allowNull: false
      },
      token_id:{
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transactions')
  }
};
