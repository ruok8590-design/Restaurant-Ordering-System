const connectDB = require('../config/db');

// Get all customer orders
const getAllOrders = async (req, res) => {
  try {
    const db = await connectDB();

    const [rows] = await db.query(`
      SELECT
        o.id AS order_id,
        o.user_id,
        u.name AS customer_name,
        u.email AS customer_email,
        o.total_amount,
        o.status,
        o.delivery_address,
        o.phone_number,
        o.payment_method,
        o.created_at,
        oi.menu_id,
        m.name AS item_name,
        oi.quantity,
        oi.price
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN menu m ON oi.menu_id = m.id
      ORDER BY o.created_at DESC
    `);

    await db.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Admin Orders Error:', error.message);
    res.status(500).json({
      message: 'Failed to fetch orders'
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const allowedStatuses = [
      'Pending',
      'Confirmed',
      'Preparing',
      'Out for Delivery',
      'Delivered',
      'Cancelled'
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid order status'
      });
    }

    const db = await connectDB();

    const [result] = await db.query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );

    await db.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    res.json({
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Update Order Error:', error.message);
    res.status(500).json({
      message: 'Failed to update order status'
    });
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus
};