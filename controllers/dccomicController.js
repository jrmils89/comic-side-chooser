var express = require('express');
var router  = express.Router();
var DCComic = require('../models/dc.js');
var dcData = require('../data/dc.js');


router.get('/seed', function(req, res) {
  DCComic.create(dcData, function(err) {
      console.log('Seeded?!');
      res.send(dcData);
  });
})

router.get('/', function(req, res) {
  if (res.locals.loggedIn) {
    DCComic.aggregate(
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
    DCComic.aggregate(
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
