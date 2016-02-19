var express = require('express');
var router  = express.Router();
var Marvel = require('../models/marvel.js');
var marvelData = require('../data/marvel.js');


router.get('/seed', function(req, res) {
  Marvel.create(marvelData, function(err) {
      console.log('Seeded?!');
      res.send(marvelData);
  });
})


router.get('/', function(req, res) {
  if (res.locals.loggedIn) {
    Marvel.aggregate(
     [
       { $sort : { appearances : -1} },
       {$limit: 25}
     ]
    ).exec(function(err, data) {
      // res.send(data);
      res.render('characters/home.ejs', {data: data});
    })
  }
  else {
    Marvel.aggregate(
     [
       { $sort : { appearances : -1} },
       {$limit: 5}
     ]
    ).exec(function(err, data) {
      // res.send(data);
      res.render('characters/home.ejs', {data: data});
    })
  }
})

module.exports = router;
