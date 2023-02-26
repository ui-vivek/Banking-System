const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const user = req.session.user;
    res.render('home', { user: user });
  });
  

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/signin');
});

module.exports = router;
