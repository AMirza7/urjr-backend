'use strict';

module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('Messages', {
      id:           { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      senderId:     { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      recipientId:  { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      subject:      { type: Sequelize.STRING, allowNull: false },
      content:      { type: Sequelize.TEXT, allowNull: false },
      sentAt:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
      readAt:       { type: Sequelize.DATE, allowNull: true },
      caseId:       { type: Sequelize.UUID, allowNull: true, references: { model: 'casefolders', key: 'id' }, onDelete: 'SET NULL' },
      attachments:  { type: Sequelize.ARRAY(Sequelize.UUID), allowNull: true, defaultValue: [] },
      createdAt:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
      updatedAt:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
    });
  },

  down: async (qi) => {
    await qi.dropTable('Messages');
  },
};