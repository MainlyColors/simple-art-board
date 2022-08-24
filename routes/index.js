import { ensureAuth, ensureGuest } from '../middleware/auth.js';
import { StoryModel } from '../models/Story.js';

// for top level routes
import express from 'express';
const router = express.Router();

// @desc  Login/Landing page
// @route GET /

// check if already authenticated then move to /dashboard else next
router.get('/', ensureGuest, (req, res) => {
  res.render('login.hbs', { layout: 'login' });
});

// @desc  Dashboard
// @route GET /dashboard

// protected route
// check if auth already applied else put back on / route
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    // lean() is a mongoose thing, to convert mongoose objects to plain JS objects
    const stories = await StoryModel.find({ user: req.user.id }).lean();

    res.render('dashboard.hbs', {
      // user comes from passport
      name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.log('💣💣💣 BANG BANG ERROR 💣💣💣');
    console.error(err);
    res.render('error/500');
  }
});

export default router;
