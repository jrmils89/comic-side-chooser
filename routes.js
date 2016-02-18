module.exports = function(app,passport) {

  var usersController     = require('./controllers/usersController');
  app.use('/users', usersController);

  app.get('/', function(req, res) {
   if(res.locals.login) {
     res.redirect('/home')
   } else {
     res.redirect('/login')
   }
  });

  app.get('/home', function(req, res) {
   if(res.locals.login) {
     res.render('index.ejs')
   } else {
     res.redirect('/login')
   }
  });

  app.get('/login', function(req, res) {
    res.render('authenticate/login.ejs');
  });

  app.get('/signup', function(req, res) {
    res.render('authenticate/signup.ejs');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
  }));

  app.post('/login', passport.authenticate('local-login', {failureRedirect: '/login' }), function(req, res) {
      res.redirect('/home')
    }
  );
}
