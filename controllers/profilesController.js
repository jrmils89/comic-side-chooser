var express = require('express');
var router  = express.Router();
var User = require('../models/user.js');

router.get('/:id', function(req,res) {
  var username = req.params.id;
  User.findOne({ 'username': username }, function (err, user) {
    res.render('profile/index.ejs', user)
  })

})

module.exports = router;
