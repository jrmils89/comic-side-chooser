var express = require('express');
var router  = express.Router();
var Marvel = require('../models/marvel.js');
var marvelData = require('../data/marvel.js');
var request = require('request');
var baseURI = 'https://marvel.wikia.com/api/v1/';
var User = require('../models/user.js');



router.get('/seed', function(req, res) {
  Marvel.create(marvelData, function(err) {
      console.log('Seeded?!');
      res.send(marvelData);
  });
});


router.get('/testAPI', function(req, res) {
  request(baseURI+'Articles/Details'+'?ids=1678,7139&abstract=500&width=200&height=200', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(body))
    }
  })
});


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

      request(baseURI+'Articles/Details?ids='+heroIds+'&abstract=500&width=300&height=300', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          res.render('characters/home.ejs', {data: data, comic: 'marvel', apiResults: JSON.parse(body)});
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

      request(baseURI+'Articles/Details?ids='+heroIds+'&abstract=500&width=300&height=300', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          res.render('characters/home.ejs', {data: data, comic: 'marvel', apiResults: JSON.parse(body)});
        }
      })
    })
  }
});


router.post('/favorites/:id', function(req, res) {
  if (res.locals.loggedIn) {
    User.findOneAndUpdate(res.locals.userId, { $push: { marvelFavorites: req.params.id } }, function(err, data) {
      res.redirect('/marvel');
    })
  }
  else {
    res.redirect('/marvel');
  }
})




module.exports = router;
