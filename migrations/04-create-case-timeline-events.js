'use strict';

module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('CaseTimelineEvents', {
      id:        { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      caseId:    { type: Sequelize.UUID, allowNull: false, references: { model: 'casefolders', key: 'id' }, onDelete: 'CASCADE' },
      title:     { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      date:      { type: Sequelize.DATE, allowNull: false },
      type:      { type: Sequelize.ENUM('filing','hearing','order','payment','document','meeting'), allowNull: false },
      status:    { type: Sequelize.ENUM('completed','upcoming','overdue'), allowNull: false },
      documents: { type: Sequelize.ARRAY(Sequelize.UUID), allowNull: true, defaultValue: [] },
      notes:     { type: Sequelize.TEXT, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
    });
  },

  down: async (qi) => {
    await qi.dropTable('CaseTimelineEvents');
    await qi.sequelize.query("DROP TYPE IF EXISTS \"enum_CaseTimelineEvents_type\";");
    await qi.sequelize.query("DROP TYPE IF EXISTS \"enum_CaseTimelineEvents_status\";");
  },
};