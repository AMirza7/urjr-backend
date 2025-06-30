'use strict';

module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('SecureNotes', {
      id:          { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      title:       { type: Sequelize.STRING, allowNull: false },
      content:     { type: Sequelize.TEXT, allowNull: false },
      encrypted:   { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      tags:        { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false, defaultValue: [] },
      caseId:      { type: Sequelize.UUID, allowNull: true, references: { model: 'casefolders', key: 'id' }, onDelete: 'SET NULL' },
      isPrivate:   { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt:   { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
      updatedAt:   { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
    });
  },

  down: async (qi) => {
    await qi.dropTable('SecureNotes');
  },
};