const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('signin');
});

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/signin');
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/signin');
    }
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    req.flash('error', 'An error occurred while signing in');
    res.redirect('/signin');
  }
});

module.exports = router;
