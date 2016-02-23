var express = require('express');
var router = express.Router();
var Marvel = require('../models/marvel.js');
var marvelData = require('../data/marvel.js');
var request = require('request');
var baseURI = 'https://marvel.wikia.com/api/v1/';
var User = require('../models/user.js');


// Seed route. User needs to be logged in and an admin user in order to be able to hit this route
router.get('/seed', isLoggedIn, isAdmin, function(req, res) {
  Marvel.create(marvelData, function(err) {
    console.log('Seeded?!');
    res.send(marvelData);
  });
});

// This is just a test route to make sure the API is/was working. You should be able to go to this route and get a JSON response
router.get('/testAPI', isLoggedIn, isAdmin, function(req, res) {
  // Request a URL with test IDs
  request(baseURI + 'Articles/Details' + '?ids=1678,7139&abstract=500&width=200&height=200', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // If there's no error and the reponse was a success then send back the data
      res.send(JSON.parse(body))
    }
  })
});

// INDEX
// This route does two different thing depending on if you're logged in or not
router.get('/', function(req, res) {
  if (res.locals.loggedIn) {
    Marvel.aggregate(
      // Sort characters by most appearances and limit to 25
      [{
        $sort: {
          appearances: -1
        }
      }, {
        $limit: 25
      }]
    ).exec(function(err, data) {
      // Hold Var for the character IDs
      var ids = [];
      for (var i = 0; i < data.length; i++) {
        // Push the character Ids into the array
        ids.push(data[i].page_id);
      }
      // Comma separate the Ids
      var heroIds = ids.join(',');
      // Send a request to the API with a 500 character abstract and 300x300 thumbnail size.
      // This API gets an overview of the article on the characters being passed to it
      request(baseURI + 'Articles/Details?ids=' + heroIds + '&abstract=500&width=300&height=300', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          // Render the character home page with the data from the DB, the type of comic it is, and the apiResults
          res.render('characters/home.ejs', {
            data: data,
            comic: 'marvel',
            apiResults: JSON.parse(body)
          });
        };
      });
    });
  } else {
    // This does the same stuff as above, just with fewer characters
    Marvel.aggregate(
      [{
        $sort: {
          appearances: -1
        }
      }, {
        $limit: 5
      }]
    ).exec(function(err, data) {

      var ids = [];
      for (var i = 0; i < data.length; i++) {
        ids.push(data[i].page_id);
      }

      var heroIds = ids.join(',');

      request(baseURI + 'Articles/Details?ids=' + heroIds + '&abstract=500&width=300&height=300', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          res.render('characters/home.ejs', {
            data: data,
            comic: 'marvel',
            apiResults: JSON.parse(body)
          });
        };
      });
    });
  };
});

//SHOW
router.get('/characters/:id', function(req, res) {
  // Find the character based on it's page_id (which is the ID from the wikia site and should correspond in our DB)
  Marvel.findOne({
    page_id: req.params.id
  }, function(err, data) {
    // Hit the API and get the article on the character from the wikia API. This endpoint gets the long version of the article
    request(baseURI + 'Articles/AsSimpleJson?id=' + data.page_id, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // Store the first result set
        var firstResult = JSON.parse(body);
        // Hit the API again (different end point) for the abstract details. This gets things like a thumnail image
        request(baseURI + 'Articles/Details?ids=' + data.page_id + '&abstract=5&width=300&height=500', function(error, response, body) {
          if (!error && response.statusCode == 200) {
            // Send back the two API responses and the DB data to the character index page along with the comic side
            res.render('characters/index.ejs', {
              data: data,
              comic: 'marvel',
              apiResults: firstResult,
              articleDetail: JSON.parse(body)
            });
          };
        });
      };
    });
  });
});

// Favorite a character
router.post('/favorites/:id', function(req, res) {
  if (res.locals.loggedIn) {
    // If the user is logged in, add the character to their Marvel favorites and redirect back to the /marvel root page
    User.findByIdAndUpdate(res.locals.userId, {
      $addToSet: {
        marvelFavorites: req.params.id
      }
    }, function(err, data) {
      res.redirect('/marvel');
    })
  } else {
    // Don't let them favorite if they're not logged in, would have no user information
    res.redirect('/marvel');
  }
})

// SEARCH
router.get('/search', function(req, res) {
  // End point for the autocomplete search. Matches based on a simple case insensitve regex expression
  // Returns only name, id, urlslug, and page id, sorted by most appearances
  console.log(req.query.q);
  var search = '/' + req.query.q + '/i';
  Marvel.find({
    name: new RegExp(req.query.q, "i")
  }, {
    name: 1,
    _id: 1,
    urlslug: 1,
    page_id: 1
  }).sort({
    appearances: -1
  }).exec(function(err, data) {
    res.send(data);
  });

})

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