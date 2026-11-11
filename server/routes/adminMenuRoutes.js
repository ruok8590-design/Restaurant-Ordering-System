const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const protectAdmin = require('../middleware/adminMiddleware');

const {
  getAdminMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/adminMenuController');

router.use(protect, protectAdmin);

router.get('/', getAdminMenu);
router.post('/', addMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;