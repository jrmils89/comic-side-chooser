var express = require('express');
var router = express.Router();
var Product = require('../models/product.js');
// var User = require('../models/user.js');
var mongoose = require('mongoose');

router.get('/seed/newproducts', function(req, res) {

  var newProducts = [
    {
      type: 'Baseball Bat',
      price: 45,
      description: 'A Baseball Bat',
      stock: 200
    },
    {
      type: 'Basketball',
      price: 25,
      description: 'A Basketball',
      stock: 100
    },
    {
      type: 'Baseball Glove',
      price: 60,
      description: 'A Single Baseball Glove',
      stock: 1
    },
    {
      type: 'Football',
      price: 30,
      description: 'A Football',
      stock: 80
    },
    {
      type: 'Cleats',
      price: 80,
      description: 'Shoes with daggers on the bottom',
      stock: 500
    },
  ];
  Product.create(newProducts, function(err) {
        console.log('SEED: NEW PRODUCTS CREATED!');
        res.redirect('/products');
  });
});

// GET
router.get('/', function(req,res) {
  Product.find({}, function(err, data) {
    res.render('products/index.ejs', {products: data});
  })
})

// NEW
router.get('/new', function(req, res) {
	res.render('products/new.ejs');
});

// SHOW
router.get('/:id', function(req, res) {
  Product.findById(req.params.id, function(err, data) {
    res.render('products/show.ejs', data)
  })
});

// EDIT
router.get('/:id/edit', function(req, res) {
  Product.findById(req.params.id, function(err, data) {
    res.render('products/edit.ejs', data)
  })
});

// CREATE
router.post('/', function(req, res) {
  var newProduct = new Product(req.body);
  newProduct.save(function(err, data){
    if (err) {
      console.log(err);
    }
  	res.redirect('/products');
  })
});

// PUT EDIT
router.put('/:id', function(req, res) {
  Product.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
    res.redirect('/products/'+req.params.id);
  });
});

// PUT BUY
// router.put('/:id/buy', function(req, res) {
//   Product.findByIdAndUpdate(req.params.id, {: {stock: -1}}, function(err, data) {
//     res.redirect('/products/'+req.params.id);
//   });
// });


// PUT IN CART
// router.post('/:id/addToCart', function(req,res) {
//   Product.findById(req.params.id, function(err, data) {
//     var item = data;
//     User.findOneAndUpdate({}, {: {shoppingCart: item}}, {upsert: true, new: true}, function(err, data) {
//       res.redirect('/users')
//     })
//   });
// })


// // DELETE
router.delete('/:id', function(req, res) {
  Product.findByIdAndRemove(req.params.id, function(err, data) {
    res.redirect('/products');
  });
});

module.exports = router;


