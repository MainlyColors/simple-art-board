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

// @desc  show all stories
// @route GET /stories

// check if already authenticated then move to /dashboard else next
storiesRouter.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await StoryModel.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();

    res.render('stories/index', { stories });
  } catch (err) {
    console.log('💣💣💣 BANG BANG ERROR 💣💣💣');
    console.error(err);
    res.render('error/500');
  }
});

// @desc  show edit page
// @route GET /stories/edit/:id

// check if already authenticated then move to /dashboard else next
storiesRouter.get('/edit/:id', ensureAuth, async (req, res) => {
  const story = await StoryModel.findOne({
    _id: req.params.id,
  }).lean();

  // if no story in DB then 404
  if (!story) {
    return res.render('error/404');
  }

  // if story user doesn't match current login user
  // strict !== doesn't work because
  /// ObjectId("6303e05ae5417ca32ba01629") vs 6303e05ae5417ca32ba01629
  if (story.user != req.user.id) {
    res.redirect('/stories');
  } else {
    res.render('stories/edit', { story });
  }
});

export default storiesRouter;
