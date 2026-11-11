const connectDB = require('../config/db');

// Get all menu items
const getAdminMenu = async (req, res) => {
  try {
    const db = await connectDB();

    const [rows] = await db.query(
      'SELECT * FROM menu ORDER BY id DESC'
    );

    await db.end();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Admin Menu Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch menu' });
  }
};

// Add a new food item
const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    if (!name || price === undefined || Number(price) <= 0) {
      return res.status(400).json({
        message: 'Valid food name and price are required'
      });
    }

    const db = await connectDB();

    const [result] = await db.query(
      `INSERT INTO menu
       (name, description, price, image, category, available)
       VALUES (?, ?, ?, ?, ?, TRUE)`,
      [name, description || '', price, image || '', category || '']
    );

    await db.end();

    res.status(201).json({
      message: 'Food item added successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Add Menu Error:', error.message);
    res.status(500).json({ message: 'Failed to add food item' });
  }
};

// Update a food item
const updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, image, category, available } = req.body;
    const { id } = req.params;

    const db = await connectDB();

    const [result] = await db.query(
      `UPDATE menu
       SET name = ?, description = ?, price = ?,
           image = ?, category = ?, available = ?
       WHERE id = ?`,
      [name, description || '', price, image || '', category || '',
       available ? 1 : 0, id]
    );

    await db.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json({ message: 'Food item updated successfully' });
  } catch (error) {
    console.error('Update Menu Error:', error.message);
    res.status(500).json({ message: 'Failed to update food item' });
  }
};

// Remove a food item without deleting its order history
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDB();

    const [result] = await db.query(
      'UPDATE menu SET available = FALSE WHERE id = ?',
      [id]
    );

    await db.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json({ message: 'Food item removed successfully' });
  } catch (error) {
    console.error('Delete Menu Error:', error.message);
    res.status(500).json({ message: 'Failed to remove food item' });
  }
};

module.exports = {
  getAdminMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
};