var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  username: {type: String},
  msg: {type: String},
  timeSent: {type: Date, default: Date.now()}
})

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;