import { ensureAuth, ensureGuest } from '../middleware/auth.js';

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
router.get('/dashboard', ensureAuth, (req, res) => {
  console.log(req.user);
  res.render('dashboard.hbs');
});

export default router;
