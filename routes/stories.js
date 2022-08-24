import { ensureAuth } from '../middleware/auth.js';
import { StoryModel } from '../models/Story.js';

// for top level routes
import express from 'express';
const storiesRouter = express.Router();

// @desc  show add page
// @route GET /stories/add

// check if already authenticated then move to /dashboard else next
storiesRouter.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add.hbs');
});

// @desc  Process add form
// @route POST /stories

// ensureAuth check if already authenticated then move to /dashboard else next
// route is already using stories so we use "/"
storiesRouter.post('/', ensureAuth, async (req, res) => {
  try {
    // add user id from passport auth object to body new user property
    req.body.user = req.user.id;
    await StoryModel.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.log('💣💣💣 BANG BANG ERROR 💣💣💣');
    console.error(err);
    res.render('error/500');
  }
});

export default storiesRouter;
