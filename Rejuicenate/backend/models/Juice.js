const mongoose = require('mongoose');

const JuiceSchema = new mongoose.Schema({
  juiceName: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String, required: true } // Assuming you store the image URL or path
});

module.exports = mongoose.model('Juice', JuiceSchema);
