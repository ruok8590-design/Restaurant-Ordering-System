
const Order = require('../models/Order');


const placeOrder = async (req, res) => {
  try {
    const {
      deliveryAddress,
      phoneNumber,
      paymentMethod,
      items
    } = req.body;

    if (
      !deliveryAddress ||
      !phoneNumber ||
      !paymentMethod ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: 'Please provide all order details.'
      });
    }

    if (!['cod', 'online'].includes(paymentMethod)) {
      return res.status(400).json({
        message: 'Invalid payment method.'
      });
    }

    for (const item of items) {
      if (
        !Number.isInteger(Number(item.menu_id)) ||
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) < 1 ||
        !Number.isFinite(Number(item.price)) ||
        Number(item.price) <= 0
      ) {
        return res.status(400).json({
          message: 'Invalid order item details.'
        });
      }
    }

    const totalAmount = items.reduce(
      (total, item) =>
        total + Number(item.price) * Number(item.quantity),
      0
    );

    const paymentStatus =
      paymentMethod === 'online' ? 'Paid' : 'Pending';
      
    const orderId = await Order.createOrder(
      req.user.id,
      totalAmount,
      deliveryAddress,
      phoneNumber,
      paymentMethod,
      items,
      paymentStatus
    );

    res.status(201).json({
      message: 'Order placed successfully!',
      orderId,
      totalAmount,
      paymentStatus
    });

  } catch (error) {
    console.error('Order Error:', error.message);

    res.status(500).json({
      message: 'Failed to place order.'
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.getOrdersByUserId(req.user.id);

    res.status(200).json(orders);
  } catch (error) {
    console.error('Fetch Orders Error:', error.message);

    res.status(500).json({
      message: 'Failed to fetch orders.'
    });
  }
};

module.exports = { placeOrder, getMyOrders };
