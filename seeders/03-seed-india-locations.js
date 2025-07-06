// src/seeders/20250706-seed-india-locations.js
'use strict';

const indianCitiesDB = require('indian-cities-database');

module.exports = {
  async up(queryInterface, Sequelize) {
    const { cities: cityList } = indianCitiesDB;

    // 1) Build unique list of state names
    const uniqueStates = [
      ...new Set(cityList.map((c) => c.state.trim())),
    ].map((stateName) => ({
      id: Sequelize.literal('uuid_generate_v4()'),
      name: stateName,
      code: null, // or derive a code if you have one
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // 2) Insert states
    await queryInterface.bulkInsert('states', uniqueStates, {});

    // 3) Fetch back state IDs so we can link cities
    const dbStates = await queryInterface.sequelize.query(
      `SELECT id, name FROM states;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const stateMap = {};
    dbStates.forEach((row) => {
      stateMap[row.name.trim()] = row.id;
    });

    // 4) Prepare city rows, linking by stateMap
    const cityRows = cityList.map(({ city, state }) => ({
      id: Sequelize.literal('uuid_generate_v4()'),
      name: city.trim(),
      stateId: stateMap[state.trim()],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // 5) Insert cities
    await queryInterface.bulkInsert('cities', cityRows, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('cities', null, {});
    await queryInterface.bulkDelete('states', null, {});
  },
};
