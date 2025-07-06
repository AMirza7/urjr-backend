'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cities', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      stateId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'states', key: 'id' },
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()')
      }
    });

    // Optional: add a composite unique index so no duplicate city names per state
    await queryInterface.addIndex('cities', ['stateId', 'name'], {
      unique: true,
      name: 'cities_stateId_name_unique'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cities');
  }
};
