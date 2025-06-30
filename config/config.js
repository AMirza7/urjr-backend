// config/config.js
require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,           // ← turn on SSL for dev
        rejectUnauthorized: false // ← allow self-signed certs
      }
    }
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: { max: 10, min: 2, acquire: 30000, idle: 10000 },
  },
};
