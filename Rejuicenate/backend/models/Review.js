const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    commentText: { type: String, required: true },
    personalTip: { type: String, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    juiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Juice', required: true },
    isFlagged: { type: Boolean, default: false }, // Default to false
    timestamp: { type: Date, default: Date.now },
  });


  module.exports = mongoose.model('Review', ReviewSchema);
  