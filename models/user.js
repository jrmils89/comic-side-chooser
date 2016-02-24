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
  comicSide: String,
  marvelFavorites: Array,
  dcFavorites: Array,
  isAdmin: {type: Boolean, default: false}
})

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.validEmail = function(email) {
  var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
  // Return TRUE for valid email
  // Retrun FALSE for invalid email
  return re.test(email);
}


var User = mongoose.model('User', userSchema);
module.exports = User;
