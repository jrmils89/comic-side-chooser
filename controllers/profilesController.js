var express = require('express');
var router  = express.Router();
var User = require('../models/user.js');
var request = require('request');
var marvelbaseURI = 'https://marvel.wikia.com/api/v1/';
var dcbaseURI = 'https://dc.wikia.com/api/v1/';


router.get('/:id',isLoggedIn, function(req,res) {
  var username = req.params.id;
  User.findOne({ 'username': username }, function (err, user) {
    request(marvelbaseURI+'Articles/Details?ids='+user.marvelFavorites+'&abstract=5&width=300&height=300', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var marvelBody = JSON.parse(body);
        request(dcbaseURI+'Articles/Details?ids='+user.dcFavorites+'&abstract=5&width=300&height=300', function(error, response, body) {
          if (!error && response.statusCode == 200) {
            res.render('profile/index.ejs', {user: user, apiResultsmarvel: marvelBody, apiResultsdc: JSON.parse(body)})
          }
        })
      }
    })
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
