const connectDB = require('../config/db');

// Get all registered customers
const getAllUsers = async (req, res) => {
  try {
    const db = await connectDB();

    const [users] = await db.query(`
      SELECT id, name, email, role, created_at
      FROM users
      WHERE role = 'customer'
      ORDER BY created_at DESC
    `);

    await db.end();

    res.status(200).json(users);

  } catch (error) {
    console.error('Admin Users Error:', error.message);

    res.status(500).json({
      message: 'Failed to fetch users'
    });
  }
};

module.exports = { getAllUsers };