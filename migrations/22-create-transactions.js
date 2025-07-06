'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      amount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      method: {
        type: Sequelize.STRING,  // e.g. 'UPI','Stripe','GooglePay'
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending','success','failed'),
        allowNull: false,
        defaultValue: 'pending',
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true,         // store gateway response, etc.
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Transactions');
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_Transactions_status";`);
  },
};
