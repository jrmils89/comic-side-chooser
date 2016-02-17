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

mongoose.connect('mongodb://localhost:27017/shopperapp');


// ===============================================================================
// Routing / Contorllers
// ===============================================================================
// var usersController = require('./controllers/users.js');
var productsController = require('./controllers/products.js');
app.use('/products', productsController);
// app.use('/users', usersController);

// ===============================================================================
// Dis Means Bizness
// ===============================================================================

app.get('/', function(req, res) {
  res.redirect('/products')
})


// ===============================================================================
// Listen To The World!
// ===============================================================================
db.once('open', function() {
  console.log('Connected To Mongoose')
  app.listen(port, function() {
    console.log('Listening....')
  })
})

