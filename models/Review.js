const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
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
    collection: 'reviews'
});

module.exports = mongoose.model('review', reviewSchema);