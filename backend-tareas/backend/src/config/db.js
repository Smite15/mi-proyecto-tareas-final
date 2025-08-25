const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "holas",            // DB_NAME
  "postgres",         // DB_USER
  "saulmite100",      // DB_PASSWORD
  {
    host: "localhost", // DB_HOST
    port: 5433,        // DB_PORT
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;