var express = require('express');
var router  = express.Router();
var User = require('../models/user.js');
// INDEX
router.get('/', function(req, res) {
	if (res.locals.login) {
		User.find({}, function(err, data) {
			res.render('users/index.ejs', {users: data, login: res.locals.login})
		})
	} else {
		res.render('users/index.ejs', {login: res.locals.login})
	}
});

router.post('/', function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err,data) {
    res.redirect('/users');
  })
})

// SHOW
router.get('/:id', function(req, res) {
	if (res.locals.login) {
		req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
		var user = User.findById(req.params.id, function(err, data) {
				res.render('users/show.ejs', {user: data, usertrue: res.locals.usertrue});
		})
	} else {
		res.redirect('/login');
	}
});

router.post('/:id/marvel/:page_id', function(req, res) {
	var userId = req.params.id;
	var characterToRemove = req.params.page_id;
	User.findByIdAndUpdate(userId, { $pull: { marvelFavorites: characterToRemove}}, {new: true}, function(err, data) {
		res.redirect('/profile/'+data.username)
	})
})

router.post('/:id/dc/:page_id', function(req, res) {
	var userId = req.params.id;
	var characterToRemove = req.params.page_id;
	User.findByIdAndUpdate(userId, { $pull: { dcFavorites: characterToRemove}}, {new: true}, function(err, data) {
		res.redirect('/profile/'+data.username)
	})
})


router.delete('/:id', function(req, res) {
	User.findByIdAndRemove(userid, function(err, data) {
		res.redirect('/users');
	})
})


module.exports = router;
