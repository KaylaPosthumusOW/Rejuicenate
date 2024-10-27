// routes/personalInformation.js
const express = require('express');
const PersonalInformation = require('../models/PersonalInfo');
const router = express.Router();

// Create or update personal information
// Create or update personal information
router.post('/add', async (req, res) => {
    try {
        const { 
            userId, age, gender, occupation, weight, height, 
            activityLevel, stressLevel, allergies, medications, 
            healthGoals, motivation, fastDuration, 
            healthConditions 
          } = req.body;
  
      // Basic validation
      if (!userId || !age || !gender || !occupation || !healthGoals || !motivation || !fastDuration) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }
  
      // Check if personal info already exists for this user
      let personalInfo = await PersonalInformation.findOne({ userId });
      
      if (personalInfo) {
        // Update existing document
        personalInfo.set({ 
            userId, age, gender, occupation, weight, height, 
          activityLevel, stressLevel, allergies, medications, 
          healthGoals, motivation, fastDuration, healthConditions // Update these fields
        });
      } else {
        // Create new document
        personalInfo = new PersonalInformation({ 
          userId, age, gender, occupation, weight, height, 
          activityLevel, stressLevel, allergies, medications, 
          healthGoals, motivation, fastDuration, healthConditions // Add these fields
        });
      }
  
      await personalInfo.save();
      res.status(201).json({ message: 'Personal information saved successfully', personalInfo });
    } catch (error) {
      res.status(500).json({ message: 'Error saving personal information', error: error.message });
    }
  });
  

// Retrieve personal information for a user
router.get('/:userId', async (req, res) => {
  try {
    const personalInfo = await PersonalInformation.findOne({ userId: req.params.userId });
    
    if (!personalInfo) {
      return res.status(404).json({ message: 'Personal information not found' });
    }

    res.status(200).json(personalInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving personal information', error: error.message });
  }
});

// Update personal information
router.put('/:id', async (req, res) => {
  try {
    const { age, gender, occupation, weight, height, activityLevel, stressLevel, allergies, medications } = req.body;

    const updatedInfo = await PersonalInformation.findByIdAndUpdate(
      req.params.id,
      { age, gender, occupation, weight, height, activityLevel, stressLevel, allergies, medications },
      { new: true } // Return the updated document
    );

    if (!updatedInfo) {
      return res.status(404).json({ message: 'Personal information not found' });
    }

    res.status(200).json({ message: 'Personal information updated successfully', updatedInfo });
  } catch (error) {
    res.status(500).json({ message: 'Error updating personal information', error: error.message });
  }
});

// Delete personal information
router.delete('/:id', async (req, res) => {
  try {
    const deletedInfo = await PersonalInformation.findByIdAndDelete(req.params.id);

    if (!deletedInfo) {
      return res.status(404).json({ message: 'Personal information not found' });
    }

    res.status(200).json({ message: 'Personal information deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting personal information', error: error.message });
  }
});

module.exports = router;
