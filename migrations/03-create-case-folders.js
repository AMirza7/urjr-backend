'use strict';

module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('casefolders', { // <-- all lowercase!
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      title:        { type: Sequelize.STRING, allowNull: false },
      caseNumber:   { type: Sequelize.STRING, allowNull: false },
      clientName:   { type: Sequelize.STRING, allowNull: false },
      caseType:     { type: Sequelize.STRING, allowNull: false },
      court:        { type: Sequelize.STRING, allowNull: false },
      status:       { type: Sequelize.STRING, allowNull: false },
      priority:     { type: Sequelize.ENUM('high','medium','low'), allowNull: false },
      startDate:    { type: Sequelize.DATE, allowNull: false },
      nextHearing:  { type: Sequelize.DATE, allowNull: true },
      assignedLawyer: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL',
      },
      description:  { type: Sequelize.TEXT, allowNull: false },
      createdAt:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
      updatedAt:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
    });
  },

  down: async (qi) => {
    await qi.dropTable('casefolders'); // <-- all lowercase!
    await qi.sequelize.query("DROP TYPE IF EXISTS \"enum_casefolders_priority\";");
  },
};
