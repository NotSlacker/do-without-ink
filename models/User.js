const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'author'
    }
  },
  created: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'users'
});

module.exports = mongoose.model('user', userSchema);