const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const protectAdmin = require('../middleware/adminMiddleware');

const {
  getAllUsers
} = require('../controllers/adminUserController');

router.get('/', protect, protectAdmin, getAllUsers);

module.exports = router;