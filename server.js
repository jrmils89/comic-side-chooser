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
var db = mongoose.connection;
var session        = require('express-session');
var cookieParser   = require('cookie-parser');
var passport       = require('passport');

// ===============================================================================
// Setup Dat Port Info, like Columbus
// ===============================================================================
var port = process.env.PORT || 3000;

// ===============================================================================
// Middlewares
// ===============================================================================

// Add ability to render static files
app.use(express.static('public'));

// Setting up that stalker stuff
logger.token('ip_address', function(req, res){ return req.connection._peername.address; });
app.use(logger(':method :url :status :user-agent :ip_address :remote-addr :response-time ms -'));

// Setup the use of ejs layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

// Setting up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting up method override
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/emailcomposer');

require('./config/passport')(passport);

app.use(cookieParser());

app.use(session({ secret: 'emailcomposerapp' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});


// ===============================================================================
// Routing / Contorllers
// ===============================================================================
require('./routes.js')(app, passport);

// ===============================================================================
// Dis Means Bizness
// ===============================================================================


// ===============================================================================
// Listen To The World!
// ===============================================================================
db.once('open', function() {
  console.log('Connected To Mongoose')
  app.listen(port, function() {
    console.log('Listening....')
  })
})

