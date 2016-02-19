// userSchema biz
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');



var userSchema = new Schema({
  username: {type: String, unique: true},
  firstName: String,
  lastName: String,
  local: {
    email: {type: String, unique: true},
    password: {type: String, required: true},
  },
  comicSide: String
})

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', userSchema);
module.exports = User;
