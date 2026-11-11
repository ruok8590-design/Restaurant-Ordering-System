
const connectDB = require('../config/db');
const bcrypt = require('bcrypt');

const registerUser = async (name, email, password) => {
  const db = await connectDB();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    return result.insertId;
  } finally {
    await db.end();
  }
};

const findUserByEmail = async (email) => {
  const db = await connectDB();

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    return rows[0];
  } finally {
    await db.end();
  }
};

const updateProfile = async (userId, name, email) => {
  const db = await connectDB();

  try {
    await db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, userId]
    );
  } finally {
    await db.end();
  }
};

module.exports = {
  registerUser,
  findUserByEmail,
  updateProfile
};
