'use strict';

module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('Flashcards', {
      id:             { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      question:       { type: Sequelize.TEXT, allowNull: false },
      answer:         { type: Sequelize.TEXT, allowNull: false },
      category:       { type: Sequelize.STRING, allowNull: false },
      difficulty:     { type: Sequelize.ENUM('easy','medium','hard'), allowNull: false },
      tags:           { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false, defaultValue: [] },
      lastReviewed:   { type: Sequelize.DATE, allowNull: true },
      timesReviewed:  { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      correctAnswers: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt:      { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
      updatedAt:      { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('now()') },
    });
  },

  down: async (qi) => {
    await qi.dropTable('Flashcards');
    await qi.sequelize.query("DROP TYPE IF EXISTS \"enum_Flashcards_difficulty\";");
  },
};