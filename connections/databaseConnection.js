const mysql = require('mysql2');
require('dotenv').config();
const pool = mysql.createPool({
  host: process.env.host,
  user:process.env.user,
  password: process.env.password,
  database:process.env.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 3306,
});

const promisePool = pool.promise();

const testConnection = async () => {
  try {
    await promisePool.query('SELECT 1'); // Test the connection
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

module.exports = { promisePool, testConnection };
