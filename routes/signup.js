const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      user_type:req.body.user_type
    });
    await user.save();
    req.flash('success', 'Account created successfully!');
    res.redirect('/signin');
  } catch (error) {
    req.flash('error', 'An error occurred while creating the account');
    console.log(error);
    res.redirect('/signup');
  }
});

module.exports = router;
