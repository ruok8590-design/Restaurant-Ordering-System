
const connectDB = require('../config/db');

const createOrder = async (
  userId,
  totalAmount,
  deliveryAddress,
  phoneNumber,
  paymentMethod,
  items,
  paymentStatus = 'Pending'
) => {
  const db = await connectDB();

  try {
    await db.beginTransaction();

    const [orderResult] = await db.query(
      `INSERT INTO orders
       (user_id, total_amount, delivery_address, phone_number, payment_method, payment_status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        totalAmount,
        deliveryAddress,
        phoneNumber,
        paymentMethod,
        paymentStatus
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await db.query(
        `INSERT INTO order_items
         (order_id, menu_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.menu_id, item.quantity, item.price]
      );
    }

    await db.commit();
    return orderId;
  } catch (error) {
    await db.rollback();
    throw error;
  } finally {
    await db.end();
  }
};

const getOrdersByUserId = async (userId) => {
  const db = await connectDB();

  try {
    const [rows] = await db.query(
      `SELECT
        o.id AS order_id,
        o.total_amount,
        o.status,
        o.delivery_address,
        o.phone_number,
        o.payment_method,
        o.payment_status,
        o.created_at,
        oi.menu_id,
        m.name AS item_name,
        oi.quantity,
        oi.price
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN menu m ON oi.menu_id = m.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [userId]
    );

    return rows;
  } finally {
    await db.end();
  }
};

module.exports = {
  createOrder,
  getOrdersByUserId
};
