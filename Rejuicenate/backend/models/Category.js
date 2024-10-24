const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  dietaryMods: {
    type: String,
    required: true,
  },
  generalRecs: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
