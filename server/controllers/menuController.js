const Menu = require('../models/Menu');

const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.getAllMenuItems();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error('Menu Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch menu items' });
  }
};

module.exports = { getMenu };