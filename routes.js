module.exports = function(app,passport) {
  var User = require('./models/user.js');
  var usersController     = require('./controllers/usersController');
  app.use('/users', usersController);


  app.get('/', function(req, res) {
   if(res.locals.loggedIn) {
     res.redirect('/home')
   } else {
     res.redirect('/login')
   }
  });

  app.get('/home', function(req, res) {
   if(res.locals.loggedIn) {
     res.render('index.ejs')
   } else {
     res.redirect('/login')
   }
  });

  app.get('/login', function(req, res) {
    if(res.locals.loggedIn) {
      res.redirect('/home')
    }
    else {
      res.render('authenticate/login.ejs')
    };
  });

  app.get('/signup', function(req, res) {
    res.render('authenticate/signup.ejs');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/loginFail', function(req, res) {
    res.send({result: {success: false}})
  });

  app.post('/signup', passport.authenticate('local-signup', {failureRedirect: '/loginFail' }),
    function(req, res) {
      res.redirect('/home/'+req.user.comicSide);
    }
  );

  app.post('/login/:id', passport.authenticate('local-login', {failureRedirect: '/loginFail' }), function(req, res) {
      console.log(req.user);
      User.findByIdAndUpdate(req.user.id, { comicSide: req.params.id }, {upsert: true}, function(err, user) {
          res.send({result: {id: req.params.id, href: '/home', success: true}})
      })
    }
  );
}
