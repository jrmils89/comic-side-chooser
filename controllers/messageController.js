var express = require('express');
var router = express.Router();
var Message = require('../models/message.js');

router.get('/json', function(req, res) {
  // Gets the messages from the last 30 mins and sorts them with the most recent at the bottom
  Message.aggregate([{
    $match: {
      timeSent: {
        $gte: new Date((Date.now() - 1000 * 60 * 30))
      }
    }
  }, {
    $sort: {
      timeSent: 1
    }
  }]).exec(function(err, data) {
    res.send(data)
  })
})

module.exports = router;
