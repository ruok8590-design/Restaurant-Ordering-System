const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const protectAdmin = require('../middleware/adminMiddleware');

const {
  getAllOrders,
  updateOrderStatus
} = require('../controllers/adminOrderController');

router.use(protect, protectAdmin);

router.get('/', getAllOrders);
router.put('/:id/status', updateOrderStatus);

module.exports = router;