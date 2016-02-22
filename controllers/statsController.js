var express = require('express');
var router  = express.Router();
var DCComic = require('../models/dc.js');
var Marvel = require('../models/marvel.js');
// var request = require('request');
var User = require('../models/user.js');


router.get('/', isLoggedIn, isAdmin, function(req, res) {
  Marvel.aggregate(
    [
        {$match: {sex: { $ne: null }}},
        { $group :
            {
                _id : { "gender" : "$sex", "year" : "$year" },
                count: { $sum: 1 },
                appearances: {$sum: "$appearances"}
            }
        },
       {$sort: {appearances: -1}}
    ]
  ).exec(function(err, marvel) {

    DCComic.aggregate(
      [
          {$match: {sex: { $ne: null }}},
          { $group :
              {
                  _id : { "gender" : "$sex", "year" : "$year" },
                  count: { $sum: 1 },
                  appearances: {$sum: "$appearances"}
              }
          },
         {$sort: {appearances: -1}}
      ]
    ).exec(function(err, dc) {
      res.render('stats/index.ejs',{data: {marvel, dc}})
    })
  })
});

router.get('/json', function(req, res) {
  Marvel.aggregate(
    [
        {$match: {sex: { $ne: null }}},
        { $group :
            {
                _id : { "gender" : "$sex", "year" : "$year" },
                count: { $sum: 1 },
                appearances: {$sum: "$appearances"}
            }
        },
       {$sort: {count: -1}}
    ]
  ).exec(function(err, marvel) {

    DCComic.aggregate(
      [
          {$match: {sex: { $ne: null }}},
          { $group :
              {
                  _id : { "gender" : "$sex", "year" : "$year" },
                  count: { $sum: 1 },
                  appearances: {$sum: "$appearances"}
              }
          },
         {$sort: {count: -1}}
      ]
    ).exec(function(err, dc) {
      res.send({data: {marvel, dc}})
    })
  })
});

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
}


function isAdmin(req, res, next) {
  // if user is an admin in the session, carry on
  if (req.user.isAdmin) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
}


module.exports = router;
