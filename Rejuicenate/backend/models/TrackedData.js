// models/TrackedData.js

const mongoose = require('mongoose');

const trackedDataSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  day: { type: Number, required: true },
  dayDescription: { type: String, required: true },
  modifications: { type: String },
  feelings: { type: String },
  juiceName: { type: String, required: true }, // Change juiceId to juiceName
  createdAt: { type: Date, default: Date.now },
});

const TrackedData = mongoose.model('TrackedData', trackedDataSchema);

module.exports = TrackedData;
