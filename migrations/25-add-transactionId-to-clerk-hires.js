// migrations/20250707-add-transactionId-to-clerk-hires.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('clerk_hires', 'transactionId', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',       // you may choose nullable:true if preferred
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('clerk_hires', 'transactionId');
  },
};
