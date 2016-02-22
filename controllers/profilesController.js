var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var request = require('request');
var marvelbaseURI = 'https://marvel.wikia.com/api/v1/';
var dcbaseURI = 'https://dc.wikia.com/api/v1/';


// INDEX
// The index route for profiles redirects you to your own profile
router.get('/', function(req, res) {
  var username = res.locals.userName;
  res.redirect('/profile/'+username);
})

// SHOW
router.get('/:id', isLoggedIn, function(req, res) {
  // Find the user
  var username = req.params.id;
  User.findOne({
    'username': username
  }, function(err, user) {
    if (user) {
      // Get the API results for the DC and Marvel favorites so that their favorite cards have information
      request(marvelbaseURI + 'Articles/Details?ids=' + user.marvelFavorites + '&abstract=5&width=300&height=300', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          // Store the marvel results
          var marvelBody = JSON.parse(body);
          // Get the DC endpoint
          request(dcbaseURI + 'Articles/Details?ids=' + user.dcFavorites + '&abstract=5&width=300&height=300', function(error, response, body) {
            if (!error && response.statusCode == 200) {
              // Send back the data
              res.render('profile/index.ejs', {
                user: user,
                apiResultsmarvel: marvelBody,
                apiResultsdc: JSON.parse(body)
              });
            };
          });
        };
      });
    } else {
      var username = res.locals.userName
      res.redirect('/profile/'+username)
    }
  });
});

// SHOW/JSON
router.get('/:id/JSON', isLoggedIn, function(req, res) {
  // Find the user
  var username = req.params.id;
  User.findOne({
    'username': username
  }, function(err, user) {
    res.send(user);
  });
});

// UPDATE
router.post('/:id', isLoggedIn, function(req, res) {
  // Get the user to update and then perform the update
  var username = req.params.id;
  User.findOneAndUpdate({
      'username': username
    }, {
      // This doesn't need to include $set as mongoose does this by default
      username: req.body.username,
      "local.email": req.body.email,
      comicSide: req.body.comicSide
    },
    function(err, user) {
      if (err) {
        // If there's a reason the profile can't be updated, redirect them back to their old profile
        res.redirect('/profile/' + username)
      } else {
        // If it's successful redirect them to the new username in case they changed it
        res.redirect('/profile/' + req.body.username)
      }
    })
})


function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;