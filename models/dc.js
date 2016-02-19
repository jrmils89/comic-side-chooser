var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dcSchema = new Schema({
  page_id: {type: Number, unique: true},
  name:String,
  urlslug:String,
  id:String,
  align:String,
  eye:String,
  hair:String,
  sex:String,
  gsm:String,
  alive:String,
  appearances:Number,
  firstAppearance:String,
  year:Number
})

var DCComic = mongoose.model('Dccharacter', dcSchema);
module.exports = DCComic;