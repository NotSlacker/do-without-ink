const express = require('express');
const router = express.Router();

const { ensureAuthenticated, } = require('../config/auth');

const Author = require('../models/author');
const Story = require('../models/story');
const Chapter = require('../models/Chapter');
const Review = require('../models/Review');

// --- STORY --- //
router.get('/:story_id', (req, res) => {
  Story
    .findById(req.params.story_id, (err, story) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        Chapter
          .find({ _id: story.chapters }, (err, chapters) => {
            if (err) {
              console.log(err);
              res.redirect('/');
            } else {
              Review
                .find({ _id: story.reviews }, (err, reviews) => {
                  if (err) {
                    console.log(err);
                    res.redirect('/');
                  } else {
                    chapters.sort((a, b) => a.created > b.created ? 1 : a.created < b.created ? -1 : 0); // OLDER FIRST
                    reviews.sort((a, b) => a.created < b.created ? 1 : a.created > b.created ? -1 : 0); // NEWER FIRST
                    res.render('story', { story, chapters, reviews });
                  }
              });
            }
        });
      }
  });
});

router.post('/', ensureAuthenticated, (req, res) => {
  const newStory = new Story({
    title: req.body.title,
    description: req.body.description,
    author: {
      id: req.user.author.id,
      username: req.user.username
    },
    chapters: [],
    reviwes: [],
    created: Date.now()
  });
  newStory
    .save()
    .then(story => {
      Author
        .findById(story.author.id, (err, author) => {
          if (err) {
            console.log(err);
            res.redirect('/');
          } else {
            author.stories.push(story._id);
            Author
              .findOneAndUpdate({ _id: author._id }, { stories: author.stories }, err => {
                if (err) console.log(err);
              });
              req.flash('success', `Story "${story.title}" was created!`);
              res.redirect('/author/' + story.author.id);
          }
        });
    });
});

router.put('/:story_id', ensureAuthenticated, (req, res) => {
  Story
    .findOneAndUpdate(
      { _id: req.params.story_id },
      { title: req.body.title, description: req.body.description },
      { new: true },
      (err, story) => {
        if (err) console.log(err);
        else {
          req.flash('success', `Story "${story.title}" was updated!`);
          res.redirect('/author/' + story.author.id);
        }
      }
    );
});

router.delete('/:story_id', ensureAuthenticated, (req, res) => {
  Story
    .findByIdAndRemove(req.params.story_id, (err, storyRemoved) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        storyRemoved.chapters.forEach(chapter => {
          Chapter
            .findByIdAndDelete(chapter, err => {
              if (err) {
                console.log(err);
                return res.redirect('/');
              }
            });
        });
        storyRemoved.reviews.forEach(review => {
          Review
            .findByIdAndDelete(review, err => {
              if (err) {
                console.log(err);
                return res.redirect('/');
              }
            });
        });
        Author
          .findById(storyRemoved.author.id, '_id stories', (err, author) => {
            if (err) {
              console.log(err);
              return res.redirect('/');
            } else {
              author.stories.splice(author.stories.indexOf(storyRemoved._id), 1);
              Author
                .findOneAndUpdate({ _id: author._id }, { stories: author.stories }, err => {
                  if (err) console.log(err);
                });
            }
          });
        req.flash('success', `Story ${storyRemoved.title} was removed!`);
        res.redirect('/author/' + storyRemoved.author.id);
      }
    });
});

// --- CHAPTER --- //
router.get('/:story_id/chapter/:chapter_id', (req, res) => {
  Chapter
    .findById(req.params.chapter_id, (err, chapter) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('chapter', { story_id: req.params.story_id, chapter });
      }
    });
});

router.post('/:story_id/chapter', ensureAuthenticated, (req, res) => {
  const newChapter = new Chapter({
    title: req.body.title,
    text: req.body.text,
    author: {
      id: req.user.author.id,
      username: req.user.username
    },
    created: Date.now()
  });
  newChapter
    .save()
    .then(chapter => {
      Story
        .findById(req.params.story_id, (err, story) => {
          if (err) {
            console.log(err);
            res.redirect('/');
          } else {
            story.chapters.push(chapter._id);
            Story
              .findOneAndUpdate({ _id: story._id }, { chapters: story.chapters }, err => {
                if (err) console.log(err);
              });
              req.flash('success', `Chapter "${chapter.title}" was created!`);
              res.redirect('/story/' + story._id);
          }
        });
    });
});

router.put('/:story_id/chapter/:chapter_id', ensureAuthenticated, (req, res) => {
  Chapter
    .findOneAndUpdate({ _id: req.params.chapter_id },
      { title: req.body.title, text: req.body.text },
      { new: true },
      (err, chapter) => {
        if (err) console.log(err);
        else {
          req.flash('success', `Chapter "${chapter.title}" was updated!`);
          res.redirect('/story/' + req.params.story_id + '/chapter/' + req.params.chapter_id);
        }
      }
    );
});

// --- REVIEW --- //
router.post('/:story_id/review', ensureAuthenticated, (req, res) => {
  const newReview = new Review({
    author: {
      id: req.user._id,
      username: req.user.username
    },
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
              });
            req.flash('success', `New review by "${review.author.username}" was posted!`);
            res.redirect('/story/' + story._id);
          }
        });
    });
});

module.exports = router;