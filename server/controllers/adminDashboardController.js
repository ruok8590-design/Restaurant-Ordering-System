const connectDB = require('../config/db');

const getDashboardStats = async (req, res) => {
  try {
    const db = await connectDB();

    const [users] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users WHERE role = 'customer'"
    );

    const [orders] = await db.query(
      'SELECT COUNT(*) AS totalOrders FROM orders'
    );

    const [menu] = await db.query(
      'SELECT COUNT(*) AS totalMenuItems FROM menu WHERE available = TRUE'
    );

    const [revenue] = await db.query(
      "SELECT COALESCE(SUM(total_amount), 0) AS totalRevenue FROM orders WHERE status != 'Cancelled'"
    );

    await db.end();

    res.status(200).json({
      totalUsers: users[0].totalUsers,
      totalOrders: orders[0].totalOrders,
      totalMenuItems: menu[0].totalMenuItems,
      totalRevenue: revenue[0].totalRevenue
    });

  } catch (error) {
    console.error('Dashboard Error:', error.message);

    res.status(500).json({
      message: 'Failed to fetch dashboard statistics'
    });
  }
};

module.exports = { getDashboardStats };