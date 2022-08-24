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

export default authRouter;
