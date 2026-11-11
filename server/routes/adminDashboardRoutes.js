const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const protectAdmin = require('../middleware/adminMiddleware');

const {
  getDashboardStats
} = require('../controllers/adminDashboardController');

router.get('/', protect, protectAdmin, getDashboardStats);

module.exports = router;