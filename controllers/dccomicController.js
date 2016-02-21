var express = require('express');
var router  = express.Router();
var DCComic = require('../models/dc.js');
var dcData = require('../data/dc.js');
var request = require('request');
var baseURI = 'https://dc.wikia.com/api/v1/';
var User = require('../models/user.js');


router.get('/seed', isLoggedIn, isAdmin, function(req, res) {
  DCComic.create(dcData, function(err) {
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

router.get('/characters/:id', function(req, res) {
  DCComic.findOne({page_id: req.params.id}, function(err, data) {
    request(baseURI+'Articles/AsSimpleJson?id='+data.page_id, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var firstResult = JSON.parse(body);
        request(baseURI+'Articles/Details?ids='+data.page_id+'&abstract=5&width=300&height=500', function(error, response, body) {
          if (!error && response.statusCode == 200) {
            res.render('characters/index.ejs', {data: data, comic: 'dc', apiResults: firstResult, articleDetail: JSON.parse(body)});
          }
        })
      }
    })
  });
})


router.get('/search', function(req,res) {
  console.log(req.query.q);
  var search = '/'+req.query.q+'/i';
  DCComic.find({name: new RegExp(req.query.q,"i")},{name: 1, _id: 1, urlslug: 1, page_id: 1}).sort({ appearances : -1}).exec(function(err, data){
    res.send(data);
  });

})

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


function isAdmin(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.user.isAdmin)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
