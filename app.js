const express        = require('express');
const mongoose       = require('mongoose');
const bcrypt         = require('bcryptjs');
const passport       = require('passport');
const LocalStrategy  = require('passport-local');
const flash          = require('connect-flash');
const methodOverride = require('method-override');
                       require('dotenv').config();

const User = require('./models/user');

const DB_URI = process.env.MONGODB_URI || process.env.MONGODB_LOCAL;
const PORT   = process.env.PORT        || 3000;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB connected:', DB_URI))
  .catch(err => console.error(err));

const app = express();

// REQUIRE ROUTES
const indexRoutes   = require('./routes/index');
const userRoutes    = require('./routes/user');
const authorRoutes  = require('./routes/author');
const storyRoutes   = require('./routes/story');
const chapterRoutes = require('./routes/chapter');
const reviewRoutes  = require('./routes/review');

// APP CONFIG
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// PASSPORT CONFIG
app.use(require('express-session')({
  secret: 'write and publish your stories secret',
  resave: false,
  saveUninitialized: false
}));
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User
      .findOne({ email: email })
      .then(user => {
        if (!user) return done(null, false, { message: 'This email is not registered' });
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) return done(null, user);
          else return done(null, false, { message: 'Password incorrect' });
        });
      });
  })
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// GLOBAL VARIABLES
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error       = req.flash('error');
  res.locals.success     = req.flash('success');
  next();
});

// USE ROUTES
app.use(indexRoutes);
app.use('/user', userRoutes);
app.use('/author', authorRoutes);
app.use('/author/:author_id/story', storyRoutes);
app.use('/author/:author_id/story/:story_id/review', reviewRoutes);
app.use('/author/:author_id/story/:story_id/chapter', chapterRoutes);

app.listen(PORT, 'localhost', () => {
  console.log(`Server runs on port ${PORT}`);
});