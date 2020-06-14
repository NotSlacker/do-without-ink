const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'chapters'
});

module.exports = mongoose.model('chapter', chapterSchema);