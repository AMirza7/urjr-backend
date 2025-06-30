'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ---- ensure uuid-ossp is enabled first if not already ----
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );

    // ---- create the PinboardPosts table ----
    await queryInterface.createTable('PinboardPosts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium',
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',   // must match your users table name
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // drop the table
    await queryInterface.dropTable('PinboardPosts');

    // and clean up the enum type in Postgres
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_PinboardPosts_priority";'
    );
  }
};
