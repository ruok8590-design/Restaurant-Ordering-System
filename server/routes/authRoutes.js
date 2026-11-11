
const express = require('express');
console.log('AUTH ROUTES LOADED');
const router = express.Router();

const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
