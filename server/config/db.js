
const mysql = require('mysql2/promise');
require('dotenv').config();

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 4000),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      }
    });

    console.log('MySQL Connected Successfully');
    return connection;

  } catch (error) {
    console.error('MySQL Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
