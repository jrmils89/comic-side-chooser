var express = require('express');
var router  = express.Router();
var User = require('../models/user.js');

router.get('/:id',isLoggedIn, function(req,res) {
  var username = req.params.id;
  User.findOne({ 'username': username }, function (err, user) {
    res.render('profile/index.ejs', user)
  })
})


router.post('/:id', isLoggedIn, function(req, res) {
  var username = req.params.id;
  User.findOneAndUpdate({ 'username': username }, {
    username: req.body.username,
    email: req.body.email, comicSide:
    req.body.comicSide },
    function(err, user) {
      if (err) {
        res.redirect('/profile/'+username)
      }
      else {
        res.redirect('/profile/'+req.body.username)
      }
  })
})


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
