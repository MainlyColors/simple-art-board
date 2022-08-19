// for top level routes
import express from 'express';
const router = express.Router();

// @desc  Login/Landing page
// @route GET /

router.get('/', (req, res) => {
  res.render('login.hbs');
});

// @desc  Dashboard
// @route GET /dashboard

router.get('/dashboard', (req, res) => {
  res.render('dashboard.hbs');
});

export default router;
