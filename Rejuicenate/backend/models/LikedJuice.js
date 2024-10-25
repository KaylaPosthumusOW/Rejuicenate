const mongoose = require('mongoose');

const likedJuiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Assuming you have a User model
  },
  juiceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Juice' // Assuming you have a Juice model
  }
});

const LikedJuice = mongoose.model('LikedJuice', likedJuiceSchema);
module.exports = LikedJuice;
