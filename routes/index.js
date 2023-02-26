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
router.use('/signup', require('./signup'));
router.use('/signin',  require('./signin'));
router.use('/dashboard',  require('./dashboard'));

router.post('/signout', (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect('/signin');
    });
  });
  

module.exports = router;
