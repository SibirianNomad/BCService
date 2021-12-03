'use strict';
const DataTypes = require('sequelize').DataTypes;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      wallet_id: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.addConstraint('wallets', {
      type: 'FOREIGN KEY',
      name: 'wallets_user_id_fkey',
      fields: ['user_id'],
      references: {
          table: 'users',
          field: 'id'
      },
      onDelete: 'cascade',

      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('wallets', 'users_wallet_id_fkey');
    return queryInterface.dropTable('users')
  }
};
