'use strict';

module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('flashcardsessions', {
      id:              { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      userId:          { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      category:        { type: Sequelize.STRING, allowNull: false },
      totalCards:      { type: Sequelize.INTEGER, allowNull: false },
      correctAnswers:  { type: Sequelize.INTEGER, allowNull: false },
      score:           { type: Sequelize.FLOAT, allowNull: false },
      timeSpent:       { type: Sequelize.INTEGER, allowNull: false },
      completedAt:     { type: Sequelize.DATE, allowNull: false },
      createdAt:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
      updatedAt:       { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
    });
  },

  down: async (qi) => {
    await qi.dropTable('flashcardsessions');
  },
};