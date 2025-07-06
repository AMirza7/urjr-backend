// src/seeders/20250706-seed-cities.js
'use strict';

module.exports = {
  async up (queryInterface) {
    // You’d look up the state IDs (or join on name) and insert city rows here...
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('cities', null, {});
  }
};
