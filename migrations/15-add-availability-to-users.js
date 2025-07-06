'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'availabilityStatus', {
      type: Sequelize.ENUM('available','busy','offline'),
      allowNull: false,
      defaultValue: 'offline',
    });
  },

  async down(queryInterface) {
    // remove column and drop the enum type
    await queryInterface.removeColumn('users', 'availabilityStatus');
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_users_availabilityStatus";`
    );
  }
};
