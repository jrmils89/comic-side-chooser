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

module.exports = router;
