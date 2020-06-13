// const passport = require('passport');
// const bcrypt = require('bcryptjs');
// const express = require('express');
// const router = express.Router();

// const {
//   ensureAuthenticated,
//   forwardAuthenticated
// } = require('../config/auth');

// const User = require('../models/user');
// const Author = require('../models/author');
// const Story = require('../models/story');
// const Chapter = require('../models/Chapter');
// const Review = require('../models/Review');

// // --- MAIN --- //
// router.get('/', (req, res) => {
//   Story.find({}, (err, stories) => {
//     if (err) console.log(err);
//     else res.render('home', { stories });
//   });
// });

// router.get('/search', (req, res) => {
//   Story.find({}, { _id: 1, title: 1 }, (err, stories) => {
//     if (err) console.log(err);
//     else {
//       const result = {
//         data: Object.fromEntries(stories.map(story => [story.title, null])),
//         links: Object.fromEntries(stories.map(story => [story.title, story._id]))
//       };
//       res.json(result);
//     }
//   });
// });

// // --- AUTHOR --- //
// router.get('/author/:author_id', (req, res) => {
//   Author.findById(req.params.author_id, (err, author) => {
//     if (err) {
//       console.log(err);
//       res.redirect('/');
//     } else {
//       Story.find({ _id: author.stories }, (err, stories) => {
//         if (err) {
//           console.log(err);
//           res.redirect('/');
//         } else {
//           stories.sort((a, b) => a.created < b.created ? 1 : a.created > b.created ? -1 : 0);
//           res.render('author', { author, stories });
//         }
//       });
//     }
//   });
// });

// router.put('/author/:author_id', ensureAuthenticated, (req, res) => {
//   Author.findOneAndUpdate({ _id: req.params.author_id }, { about: req.body.about }, err => {
//     if (err) console.log(err);
//   });
//   req.flash('success', '"About" section was updated!');
//   res.redirect('/author/' + req.params.author_id);
// });

// // --- STORY --- //
// router.get('/story/:story_id', (req, res) => {
//   Story.findById(req.params.story_id, (err, story) => {
//     if (err) {
//       console.log(err);
//       res.redirect('/');
//     } else {
//       Chapter.find({ _id: story.chapters }, (err, chapters) => {
//         if (err) {
//           console.log(err);
//           res.redirect('/');
//         } else {
//           Review.find({ _id: story.reviews }, (err, reviews) => {
//             if (err) {
//               console.log(err);
//               res.redirect('/');
//             } else {
//               chapters.sort((a, b) => a.created > b.created ? 1 : a.created < b.created ? -1 : 0); // OLDER FIRST
//               reviews.sort((a, b) => a.created < b.created ? 1 : a.created > b.created ? -1 : 0); // NEWER FIRST
//               res.render('story', { story, chapters, reviews });
//             }
//           });
//         }
//       });
//     }
//   });
// });

// router.post('/story', ensureAuthenticated, (req, res) => {
//   const newStory = new Story({
//     title: req.body.title,
//     description: req.body.description,
//     author: {
//       id: req.user.author.id,
//       username: req.user.username
//     },
//     chapters: [],
//     reviwes: [],
//     created: Date.now()
//   });
//   newStory
//     .save()
//     .then(story => {
//       Author.findById(story.author.id, (err, author) => {
//         if (err) {
//           console.log(err);
//           res.redirect('/');
//         } else {
//           author.stories.push(story._id);
//           Author.findOneAndUpdate({ _id: author._id }, { stories: author.stories }, err => {
//             if (err) console.log(err);
//           });
//           req.flash('success', `Story "${story.title}" was created!`);
//           res.redirect('/author/' + story.author.id);
//         }
//       });
//     });
// });

// router.put('/story/:story_id', ensureAuthenticated, (req, res) => {
//   Story.findOneAndUpdate({ _id: req.params.story_id }, { title: req.body.title, description: req.body.description },
//     { new: true }, (err, story) => {
//       if (err) console.log(err);
//       else {
//         req.flash('success', `Story "${story.title}" was updated!`);
//         res.redirect('/author/' + story.author.id);
//       }
//     });
// });

// router.delete('/story/:story_id', ensureAuthenticated, (req, res) => {
//   Story.findByIdAndRemove(req.params.story_id, (err, storyRemoved) => {
//     if (err) {
//       console.log(err);
//       res.redirect('/');
//     } else {
//       storyRemoved.chapters.forEach(chapter => {
//         Chapter.findByIdAndDelete(chapter, err => {
//           if (err) {
//             console.log(err);
//             return res.redirect('/');
//           }
//         });
//       });
//       storyRemoved.reviews.forEach(review => {
//         Review.findByIdAndDelete(review, err => {
//           if (err) {
//             console.log(err);
//             return res.redirect('/');
//           }
//         });
//       });
//       Author.findById(storyRemoved.author.id, '_id stories', (err, author) => {
//         if (err) {
//           console.log(err);
//           return res.redirect('/');
//         } else {
//           author.stories.splice(author.stories.indexOf(storyRemoved._id), 1);
//           Author.findOneAndUpdate({ _id: author._id }, { stories: author.stories }, err => {
//             if (err) console.log(err);
//           });
//         }
//       });
//       req.flash('success', `Story ${storyRemoved.title} was removed!`);
//       res.redirect('/author/' + storyRemoved.author.id);
//     }
//   });
// });

// // --- CHAPTER --- //
// router.get('/story/:story_id/chapter/:chapter_id', (req, res) => {
//   Chapter.findById(req.params.chapter_id, (err, chapter) => {
//     if (err) {
//       console.log(err);
//       res.redirect('/');
//     } else {
//       res.render('chapter', { story_id: req.params.story_id, chapter });
//     }
//   });
// });

// router.post('/story/:story_id/chapter', ensureAuthenticated, (req, res) => {
//   const newChapter = new Chapter({
//     title: req.body.title,
//     text: req.body.text,
//     author: {
//       id: req.user.author.id,
//       username: req.user.username
//     },
//     created: Date.now()
//   });
//   newChapter
//     .save()
//     .then(chapter => {
//       Story.findById(req.params.story_id, (err, story) => {
//         if (err) {
//           console.log(err);
//           res.redirect('/');
//         } else {
//           story.chapters.push(chapter._id);
//           Story.findOneAndUpdate({ _id: story._id }, { chapters: story.chapters }, err => {
//             if (err) console.log(err);
//           });
//           req.flash('success', `Chapter "${chapter.title}" was created!`);
//           res.redirect('/story/' + story._id);
//         }
//       });
//     });
// });

// router.put('/story/:story_id/chapter/:chapter_id', ensureAuthenticated, (req, res) => {
//   Chapter.findOneAndUpdate({ _id: req.params.chapter_id }, { title: req.body.title, text: req.body.text },
//     { new: true }, (err, chapter) => {
//       if (err) console.log(err);
//       else {
//         req.flash('success', `Chapter "${chapter.title}" was updated!`);
//         res.redirect('/story/'+ req.params.story_id + '/chapter/' + req.params.chapter_id);
//       }
//     });
// });

// // --- REVIEW --- //
// router.post('/story/:story_id/review', ensureAuthenticated, (req, res) => {
//   const newReview = new Review({
//     author: {
//       id: req.user._id,
//       username: req.user.username
//     },
//     text: req.body.text,
//     created: Date.now()
//   });
//   newReview
//     .save()
//     .then(review => {
//       Story.findById(req.params.story_id, (err, story) => {
//         if (err) {
//           console.log(err);
//           res.redirect('/');
//         } else {
//           story.reviews.push(review._id);
//           Story.findOneAndUpdate({ _id: story._id }, { reviews: story.reviews }, err => {
//             if (err) console.log(err);
//           });
//           req.flash('success', `New review by "${review.author.username}" was posted!`);
//           res.redirect('/story/' + story._id);
//         }
//       });
//     });
// });

// // --- LOGIN --- //
// router.get('/login', forwardAuthenticated, (req, res) => {
//   res.render('login');
// });

// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successFlash: 'You have been successfully logged in!',
//     failureFlash: true,
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })(req, res, next);
// });

// // --- REGISTER --- //
// router.get('/register', (req, res) => {
//   res.render('register');
// });

// router.post('/register', (req, res) => {
//   const { username, email, password, password2 } = req.body;
//   let error = '';

//   if (password && password.length < 6) error = 'Password must be at least 6 characters';
//   else if (password !== password2) error = 'Passwords do not match';
//   console.log(error);
//   if (error.length > 0) {
//     res.render('register', { username, email, password, password2, error });
//   } else {
//     User
//       .findOne({ email: email })
//       .then(user => {
//         if (user) {
//           error = 'This email already registered';
//           res.render('register', { username, email, password, password2, error });
//         } else {
//           bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(password, salt, (err, hashed) => {
//               if (err) throw err;
//               const now = Date.now();
//               const newAuthor = new Author({
//                 username: username,
//                 about: '',
//                 stories: []
//               });
//               newAuthor
//                 .save()
//                 .catch(err => console.log(err));
//               const newUser = new User({
//                 username: username,
//                 email: email,
//                 password: hashed,
//                 author: {
//                   id: newAuthor._id
//                 },
//                 created: now
//               });
//               newUser
//                 .save()
//                 .then(user => {
//                   req.flash('success', 'Welcome, ' + user.username + '!');
//                   passport.authenticate('local')(req, res, () => {
//                     res.redirect('/');
//                   });
//                 })
//                 .catch(err => console.log(err));
//             });
//         });
//       }
//     });
//   }
// });

// // --- LOGOUT --- //
// router.get('/logout', function (req, res) {
//   req.logout();
//   req.flash('success', 'You have been logged out!');
//   res.redirect('/');
// });

// module.exports = router;

const express = require('express');
const router = express.Router();

const Story = require('../models/story');

// --- MAIN --- //
router.get('/', (req, res) => {
  Story.find({}, (err, stories) => {
    if (err) console.log(err);
    else res.render('home', { stories });
  });
});

router.get('/search', (req, res) => {
  Story.find({}, { _id: 1, title: 1 }, (err, stories) => {
    if (err) console.log(err);
    else {
      const result = {
        data: Object.fromEntries(stories.map(story => [story.title, null])),
        links: Object.fromEntries(stories.map(story => [story.title, story._id]))
      };
      res.json(result);
    }
  });
});

module.exports = router;