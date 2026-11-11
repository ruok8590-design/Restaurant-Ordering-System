
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please fill all fields'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters'
      });
    }

    const existingUser = await User.findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: 'Email already registered'
      });
    }

    const userId = await User.registerUser(name, email, password);

    res.status(201).json({
      message: 'Registration successful',
      userId
    });

  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({
      message: 'Registration failed'
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please enter email and password'
      });
    }

    const user = await User.findUserByEmail(email);
  

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }
const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);
    res.json({
      message: 'Login successful',
      token,
   user: {
     id: user.id,
     name: user.name,
     email: user.email,
     role: user.role
}
    });

  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({
      message: 'Login failed'
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;

    if (!name || !email) {
      return res.status(400).json({
        message: 'Name and email are required'
      });
    }

    const existingUser = await User.findUserByEmail(email);

    if (existingUser && existingUser.id !== userId) {
      return res.status(409).json({
        message: 'Email already registered'
      });
    }

    await User.updateProfile(userId, name, email);

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: userId,
        name,
        email,
        role: req.user.role
      }
    });

  } catch (error) {
    console.error('Profile Update Error:', error.message);
    res.status(500).json({
      message: 'Profile update failed'
    });
  }
};


module.exports = { register, login, updateProfile };
