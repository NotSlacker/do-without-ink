const express = require('express');
const router  = express.Router();

const { ensureAuthenticated } = require('../config/auth');

const Author = require('../models/Author');
const Story  = require('../models/Story');

router.get('/:author_id', (req, res) => {
  Author
    .findById(req.params.author_id, (err, author) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        Story
          .find({ _id: author.stories }, (err, stories) => {
            if (err) {
              console.log(err);
              res.redirect('/');
            } else {
              stories.sort((a, b) => a.created < b.created ? 1 : a.created > b.created ? -1 : 0);
              res.render('author', { author, stories });
            }
          });
      }
  });
});

router.put('/:author_id', ensureAuthenticated, (req, res) => {
  Author
    .findOneAndUpdate({ _id: req.params.author_id }, { about: req.body.about }, err => {
      if (err) console.log(err);
    });
  req.flash('success', '"About" section was updated!');
  res.redirect('/author/' + req.params.author_id);
});

module.exports = router;