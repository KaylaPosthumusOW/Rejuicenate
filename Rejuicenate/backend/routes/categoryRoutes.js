const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); 


// Fetch all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get category by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new category
router.post('/add', async (req, res) => {
  const { category, dietaryMods, generalRecs } = req.body;

  try {
    // Create a new category
    const newCategory = new Category({
      category,
      dietaryMods,
      generalRecs,
    });

    // Save the category to the database
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;
