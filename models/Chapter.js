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
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
    }
  },
  created: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'chapters'
});

module.exports = mongoose.model('chapter', chapterSchema);