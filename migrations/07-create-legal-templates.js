'use strict';

module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('LegalTemplates', {
      id:           { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      category:     { type: Sequelize.STRING, allowNull: false },
      title:        { type: Sequelize.STRING, allowNull: false },
      description:  { type: Sequelize.TEXT, allowNull: false },
      content:      { type: Sequelize.TEXT, allowNull: false },
      placeholders: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false, defaultValue: [] },
      downloads:    { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
      updatedAt:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
    });
  },

  down: async (qi) => {
    await qi.dropTable('LegalTemplates');
  },
};