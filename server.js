// ===============================================================================
// Setup 'Dose Requirements
// ===============================================================================

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var mongoose = require('mongoose');
var session        = require('express-session');
var cookieParser   = require('cookie-parser');
var passport       = require('passport');
var http = require('http');

// ===============================================================================
// Setup Dat Port Info, like Columbus
// ===============================================================================

var port = process.env.PORT || 3000;

// ===============================================================================
// Database Stuff
// ===============================================================================

var db = mongoose.connection;
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/comic-side';
mongoose.connect(mongoUri);

// ===============================================================================
// Middlewares
// ===============================================================================

// Add ability to render static files
app.use(express.static('public'));


// Setup the use of ejs layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

// Setting up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the passport config
require('./config/passport')(passport);

// Cookie and session stuff
app.use(cookieParser());
app.use(session({ secret: 'comicsidesapp' }));

// Using passport
app.use(passport.initialize());
app.use(passport.session());

// Method override for submiting things other than POSTs
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Setting up that stalker stuff
logger.token('ip_address', function(req, res){ return req.connection._peername.address; });
logger.token('userid', function(req, res){ if (req.user) return req.user._id ; });
app.use(logger(':method :url :status :user-agent :ip_address user_id: :userid :remote-addr :response-time ms'));

// Setting up local variables to use across the app
app.use(function(req, res, next) {
  res.locals.loggedIn = req.isAuthenticated();
  if (req.user) {
    res.locals.userId = req.user._id;
    res.locals.userName = req.user.username;
    res.locals.comicSide = req.user.comicSide;
    res.locals.marvelFaves = req.user.marvelFavorites;
    res.locals.dcFaves = req.user.dcFavorites;
    res.locals.isAdmin = req.user.isAdmin;
    if (req.user.comicSide == 'marvel') {
      res.locals.otherSide = 'dc'
    } else if (req.user.comicSide == 'dc') {
      res.locals.otherSide = 'marvel'
    }
  }
  next();
});


// ===============================================================================
// Routing / Contorllers / Server Creation / Chatting
// ===============================================================================

require('./routes.js')(app, passport);

// Create the server
var server = http.createServer(app);

// Require the chat and pass in the server
require('./controllers/chatController.js')(server);

// ===============================================================================
// Listen To The World!
// ===============================================================================


require('./data/cleanupScript.js');


db.once('open', function() {
  console.log('Connected To Mongoose');
  server.listen(port, function() {
    console.log('Listening....')
  })
})



module.exports = server;