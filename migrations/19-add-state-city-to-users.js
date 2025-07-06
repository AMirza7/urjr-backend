'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'stateId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'states', key: 'id' },
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('users', 'cityId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'cities', key: 'id' },
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'cityId');
    await queryInterface.removeColumn('users', 'stateId');
  }
};
