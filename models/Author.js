const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  about: {
    type: String,
    trim: true,
    default: ''
  },
  stories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'story'
  }],
  created: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'authors'
});

module.exports = mongoose.model('author', authorSchema);