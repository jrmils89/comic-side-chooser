var express = require('express');
var router  = express.Router();
var DCComic = require('../models/dc.js');
var dcData = require('../data/dc.js');
var request = require('request');
var baseURI = 'https://dc.wikia.com/api/v1/';
var User = require('../models/user.js');


router.get('/seed', function(req, res) {
  DCComic.create(dcData, function(err) {
      console.log('Seeded?!');
      res.send(dcData);
  });
})

// router.get('/', function(req, res) {
//   if (res.locals.loggedIn) {
//     DCComic.aggregate(
//      [
//        { $sort : { appearances : -1} },
//        {$limit: 25}
//      ]
//     ).exec(function(err, data) {
//       // res.send(data);
//       res.render('characters/home.ejs', {data: data});
//     })
//   }
//   else {
//     DCComic.aggregate(
//      [
//        { $sort : { appearances : -1} },
//        {$limit: 5}
//      ]
//     ).exec(function(err, data) {
//       // res.send(data);
//       res.render('characters/home.ejs', {data: data});
//     })
//   }
// })


router.get('/', function(req, res) {
  if (res.locals.loggedIn) {
    DCComic.aggregate(
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
          res.render('characters/home.ejs', {data: data, comic: 'dc', apiResults: JSON.parse(body)});
        }
      })
    })
  }
  else {
    DCComic.aggregate(
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
          res.render('characters/home.ejs', {data: data, comic: 'dc', apiResults: JSON.parse(body)});
        }
      })
    })
  }
})


router.post('/favorites/:id', function(req, res) {
  if (res.locals.loggedIn) {
    User.findOneAndUpdate(res.locals.userId, { $push: { dcFavorites: req.params.id } }, function(err, data) {
      res.redirect('/dc');
    })
  }
  else {
    res.redirect('/dc');
  }
})


module.exports = router;
