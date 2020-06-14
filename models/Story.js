const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  chapters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chapter'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'review'
  }],
  created: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'stories'
});

module.exports = mongoose.model('story', storySchema);