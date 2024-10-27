const express = require('express');
const router = express.Router();
const Juice = require('../models/Juice');
const multer = require('multer');
const path = require('path');

// Route to get all juices
router.get('/', async (req, res) => {
    try {
        const juices = await Juice.find();
        res.status(200).json(juices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Backend route to fetch a juice by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const juice = await Juice.findById(id).populate('category_id');

        if (!juice) {
            return res.status(404).json({ error: 'Juice not found' });
        }

        res.json(juice);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to add a new juice
router.post('/add', upload.single('image'), async (req, res) => {
    const { juiceName, ingredients, instructions, category_id } = req.body;

    if (!juiceName || !ingredients || !instructions || !category_id || !req.file) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const imageUrl = req.file.path;
        const newJuice = new Juice({
            juiceName,
            ingredients,
            instructions,
            category_id,
            image: imageUrl,
        });

        await newJuice.save();
        res.status(201).json({ message: 'Juice added successfully!' });
    } catch (error) {
        console.error('Error saving juice:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update an existing juice
router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { juiceName, ingredients, instructions, category_id } = req.body;
        const updateData = { juiceName, ingredients, instructions, category_id };

        if (req.file) {
            updateData.image = req.file.path; // Update image path if a new one is uploaded
        }

        const updatedJuice = await Juice.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedJuice) {
            return res.status(404).json({ error: 'Juice not found' });
        }

        res.status(200).json({ message: 'Juice updated successfully!', juice: updatedJuice });
    } catch (error) {
        console.error('Error updating juice:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete a juice
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedJuice = await Juice.findByIdAndDelete(id);
        
        if (!deletedJuice) {
            return res.status(404).json({ error: 'Juice not found' });
        }

        res.status(200).json({ message: 'Juice deleted successfully!' });
    } catch (error) {
        console.error('Error deleting juice:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
