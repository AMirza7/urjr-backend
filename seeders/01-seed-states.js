// src/seeders/20250706-seed-states.js
'use strict';

module.exports = {
  async up (queryInterface) {
    const states = [
      { name: 'Andhra Pradesh', code: 'AP' },
      { name: 'Arunachal Pradesh', code: 'AR' },
      // … all other states …
    ].map(s => ({
      id: queryInterface.sequelize.literal('uuid_generate_v4()'),
      ...s,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('states', states);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('states', null, {});
  }
};
