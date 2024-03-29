const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  host: process.env.host,
  username: process.env.user,
  password:process.env.password,
  database:process.env.database,
  dialect: 'mysql', 
});

module.exports = { sequelize };
