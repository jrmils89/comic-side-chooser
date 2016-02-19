var express = require('express');
var router  = express.Router();
var Marvel = require('../models/marvel.js');
var marvelData = require('../data/marvel.js');
var request = require('request');
var baseURI = 'http://marvel.wikia.com/api/v1/';


router.get('/seed', function(req, res) {
  Marvel.create(marvelData, function(err) {
      console.log('Seeded?!');
      res.send(marvelData);
  });
})


router.get('/testAPI', function(req, res) {
  request(baseURI+'Articles/Details'+'?ids=1678,7139&abstract=100&width=200&height=200', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(body))
    }
  })
})


router.get('/', function(req, res) {
  if (res.locals.loggedIn) {
    Marvel.aggregate(
     [
       { $sort : { appearances : -1} },
       {$limit: 25}
     ]
    ).exec(function(err, data) {
      var ids = [];
      for (var i=0; i < data.length; i++) {
        ids.push(data[i].page_id);
      }

      var heroIds = ids.join(',');

      request(baseURI+'Articles/Details?ids='+heroIds+'&abstract=100&width=300&height=300', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          res.render('characters/home.ejs', {data: data, apiResults: JSON.parse(body)});
        }
      })
    })
  }
  else {
    Marvel.aggregate(
     [
       { $sort : { appearances : -1} },
       {$limit: 5}
     ]
    ).exec(function(err, data) {

      var ids = [];
      for (var i=0; i < data.length; i++) {
        ids.push(data[i].page_id);
      }

      var heroIds = ids.join(',');

      request(baseURI+'Articles/Details?ids='+heroIds+'&abstract=100&width=300&height=300', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          res.render('characters/home.ejs', {data: data, apiResults: JSON.parse(body)});
        }
      })
    })
  }
})

module.exports = router;
