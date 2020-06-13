module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.flash('error', 'Log in to view that resource');
    res.redirect('/');
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
  }
};