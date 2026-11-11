const connectDB = require('../config/db');

const getAllMenuItems = async () => {
  const db = await connectDB();
  const [rows] = await db.query(
    'SELECT * FROM menu WHERE available = TRUE'
  );
  await db.end();
  return rows;
};

module.exports = { getAllMenuItems };