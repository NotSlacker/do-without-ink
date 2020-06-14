const express = require('express');
const router  = express.Router({ mergeParams: true });

const { ensureAuthenticated, } = require('../config/auth');

const Story  = require('../models/Story');
const Review = require('../models/Review');

router.post('/', ensureAuthenticated, (req, res) => {
  const newReview = new Review({
    username: req.user.username,
    text: req.body.text,
    created: Date.now()
  });
  newReview
    .save()
    .then(review => {
      Story
        .findById(req.params.story_id, (err, story) => {
          if (err) {
            console.log(err);
            res.redirect('/');
          } else {
            story.reviews.push(review._id);
            Story
              .findOneAndUpdate({ _id: story._id }, { reviews: story.reviews }, err => {
                if (err) console.log(err);
                else {
                  req.flash('success', `New review by "${review.username}" was posted!`);
                  res.redirect('/author/' + req.params.author_id + '/story/' + story._id);
                }
              });
          }
        });
    });
});

module.exports = router;