// for top level routes
import express from 'express';
import passport from 'passport';
const authRouter = express.Router();

// @desc Auth with google
// @route GET /auth/google

// gets linked with /auth in app.js
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

// @desc  Google auth callback
// @route GET /auth/google/callback

// gets linked with /auth in app.js
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }), // on fail redirect to dashboard
  (req, res) => {
    // if successful redirect to dashboard
    res.redirect('/dashboard');
  }
);

// @desc  Google auth callback
// @route GET /auth/logout

// gets linked with /auth in app.js
authRouter.get('/logout', (req, res, next) => {
  // with passport middleware once we login we will have a logout method on the request object
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

export default authRouter;
