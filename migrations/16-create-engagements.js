'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Engagements', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
      },
      clientId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      clerkId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL',
      },
      fee: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      commission: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending','active','completed','cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Engagements');
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_Engagements_status";`
    );
  }
};
