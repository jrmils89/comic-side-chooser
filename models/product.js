var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var productSchema = new Schema({
  type: {type: String, required: true},
  price: {type: Number, required: true},
  description: String,
  stock: Number
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
