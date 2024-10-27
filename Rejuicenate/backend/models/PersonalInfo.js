const mongoose = require('mongoose');

const PersonalInfoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  occupation: { type: String, required: true },
  weight: { type: Number },
  height: { type: Number },
  activityLevel: { type: String },
  stressLevel: { type: String },
  allergies: { type: [String] },
  medications: { type: [String] },
  healthGoals: { type: String, required: true }, // Add new fields
  motivation: { type: String, required: true },
  fastDuration: { type: Number, required: true },
  healthConditions: { type: String, required: true },
});

module.exports = mongoose.model('PersonalInformation', PersonalInfoSchema);
