'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'rating', {
      type: Sequelize.DECIMAL(2,1),
      allowNull: false,
      defaultValue: 0.0,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'rating');
  }
};
