'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('legal_templates', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      category:     { type: Sequelize.STRING, allowNull: false },
      title:        { type: Sequelize.STRING, allowNull: false },
      description:  { type: Sequelize.TEXT,   allowNull: false },
      content:      { type: Sequelize.TEXT,   allowNull: false },
      placeholders: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false, defaultValue: [] },
      downloads:    { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      status:       { type: Sequelize.ENUM('pending','approved','rejected'), allowNull: false, defaultValue: 'pending' },
      rejectionReason: { type: Sequelize.TEXT, allowNull: true },
      createdAt:    { type: Sequelize.DATE,   allowNull: false, defaultValue: Sequelize.literal('now()') },
      updatedAt:    { type: Sequelize.DATE,   allowNull: false, defaultValue: Sequelize.literal('now()') },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('legal_templates');
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_legal_templates_status";`);
  }
};
