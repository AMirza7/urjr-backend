'use strict';

module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('CalendarEvents', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('hearing','meeting','deadline','reminder'),
        allowNull: false,
      },
      caseId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'casefolders', key: 'id' },
        onDelete: 'SET NULL',
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attendees: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
      reminders: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
        defaultValue: [],
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

  down: async (qi) => {
    await qi.dropTable('CalendarEvents');
    // remove ENUM type
    await qi.sequelize.query("DROP TYPE IF EXISTS \"enum_CalendarEvents_type\";");
  },
};