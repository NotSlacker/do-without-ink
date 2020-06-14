const express  = require('express');
const passport = require('passport');
const bcrypt   = require('bcryptjs');
const router   = express.Router();

const { forwardAuthenticated } = require('../config/auth');

const User   = require('../models/User');
const Author = require('../models/Author');

router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successFlash: 'You have been successfully logged in!',
    failureFlash: true,
    successRedirect: '/',
    failureRedirect: '/user/login'
  })(req, res, next);
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, email, password, password2 } = req.body;
  let error = '';

  if (password && password.length < 6) {
    error = 'Password must be at least 6 characters';
  } else if (password !== password2) {
    error = 'Passwords do not match';
  }
  
  if (error.length > 0) {
    res.render('register', { username, email, password, password2, error });
  } else {
    User
      .findOne({ email: email })
      .then(user => {
        if (user) {
          error = 'This email already registered';
          res.render('register', { username, email, password, password2, error });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hashed) => {
              if (err) throw err;
              const date = Date.now();
              const newAuthor = new Author({
                username: username,
                about: '',
                stories: [],
                created: date
              });
              newAuthor
                .save()
                .catch(err => console.log(err));
              const newUser = new User({
                username: username,
                email: email,
                password: hashed,
                author: {
                  id: newAuthor._id
                },
                created: date
              });
              newUser
                .save()
                .then(user => {
                  req.flash('success', 'Welcome, ' + user.username + '!');
                  passport.authenticate('local')(req, res, () => {
                    res.redirect('/');
                  });
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
  }
});

router.get('/logout', function (req, res) {
  req.logout();
  req.flash('success', 'You have been logged out!');
  res.redirect('/');
});

module.exports = router;