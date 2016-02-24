var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cleanupSchema = new Schema({
  boolean: Boolean,
  date: {type: Date, default: Date.now()}
});

var Clean = mongoose.model('Clean', cleanupSchema);
module.exports = Clean;