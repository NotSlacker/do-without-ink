const express = require('express');
const router  = express.Router({ mergeParams: true });

const { ensureAuthenticated } = require('../config/auth');

const Story   = require('../models/Story');
const Chapter = require('../models/Chapter');

router.get('/:chapter_id', (req, res) => {
  Chapter
    .findById(req.params.chapter_id, (err, chapter) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('chapter', { author_id: req.params.author_id, story_id: req.params.story_id, chapter });
      }
    });
});

router.post('/', ensureAuthenticated, (req, res) => {
  const newChapter = new Chapter({
    title: req.body.title,
    text: req.body.text,
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
              res.redirect('/author/' + req.params.author_id + '/story/' + req.params.story_id);
          }
        });
    });
});

router.put('/:chapter_id', ensureAuthenticated, (req, res) => {
  Chapter
    .findOneAndUpdate({ _id: req.params.chapter_id },
      { title: req.body.title, text: req.body.text },
      { new: true },
      (err, chapter) => {
        if (err) console.log(err);
        else {
          req.flash('success', `Chapter "${chapter.title}" was updated!`);
          res.redirect('/author/' + req.params.author_id + '/story/' + req.params.story_id + '/chapter/' + req.params.chapter_id);
        }
      }
    );
});

module.exports = router;