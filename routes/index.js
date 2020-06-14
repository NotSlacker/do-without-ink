const express = require('express');
const router  = express.Router();

const Author = require('../models/Author');
const Story  = require('../models/Story');

router.get('/', (req, res) => {
  let collection = [];
  Author
    .find({}, (err, authors) => {
      if (err) console.log(err);
      else {
        authors.forEach(author => {
          Story.find({ _id: author.stories }, (err, stories) => {
            if (err) console.log(err);
            else {
              stories.forEach(story => {
                collection.push({ author_id: author._id, story: story });
              });
            }
          });
        });
      }
    });
  res.render('home', { collection });
});

router.get('/search', (req, res) => {
  Author
    .find({}, (err, authors) => {
      if (err) console.log(err);
      else {
        authors.forEach(author => {
          Story
            .find({ _id: author.stories }, (err, stories) => {
              if (err) console.log(err);
              else {
                const result = {
                  data: Object.fromEntries(stories.map(story => [story.title, null])),
                  links: Object.fromEntries(stories.map(story => [story.title, { story_id: story._id, author_id: author._id }]))
                };
                res.json(result);
              }
            });
        });
      }
    });
});

module.exports = router;