const express = require('express');
const router  = express.Router();

const Author = require('../models/author');

router.get('/', (req, res) => {
  let collection = [];
  Author
    .find({})
    .populate('stories')
    .exec((err, authors) => {
      if (err) console.log(err);
      else {
        authors.forEach(author => {
          author.stories.forEach(story => {
            collection.push({ author_id: author._id, story: story });
          });
        });
        res.render('home', { collection });
      }
    });
});

router.get('/search', (req, res) => {
  let result = { data: {}, links: {} };
  Author
    .find({})
    .populate('stories')
    .exec((err, authors) => {
      if (err) console.log(err);
      else {
        authors.forEach(author => {
          author.stories.forEach(story => {
            result.data[story.title] = null;
            result.links[story.title] = { story_id: story._id, author_id: author._id };
          });
        });
        res.json(result);
      }
    });
});

module.exports = router;