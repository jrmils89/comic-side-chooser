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

module.exports = router;
