var request = require('supertest');
var express = require('express');
var app = express();
var url = 'http://localhost:3000';
var User = require('../models/user');
require('../server');


describe('GET /marvel: ', function(){
  // Testing that a request to /marvel returns a success response
  it('GET /marvel', function(done){
    request(url).get('/marvel')
      .expect(200, done);
  })
});

describe('GET /dc: ', function(){
  // Testing that a request to /marvel returns a success response
  it('GET /dc', function(done){
    request(url).get('/dc')
      .expect(200, done);
  })
});

describe('CREATE USER TESTS: ', function() {
  // Holder var so that a session can be used in other tests
  var Cookies;
  // Testing the signup functionality
  it('TEST /signup', function(done) {
    request(url)
    .post('/signup')
    // Dummy user
    .send({"email": "user_test@example.com", "password":"123", "username":"testusername"})
    .set('Accept','application/json')
    .expect(200)
    .end(function(err, res) {
      if (err) throw (err);
      // Set the cookie to the res cookie so it can be used later
      Cookies = res.headers['set-cookie'];
      done();
    })

    //Note:
    // This has thrown a false error at times due to bad mongo indexes. If this throws and error
    // and you don't think it should, perhaps check to see if the indexes on the mongo collection are out of date 
  })

  it('GET /profile/testusername', function (done) {
    // Check the profile of the created user loads properly
    request(url).get('/profile/testusername')
      .set('Accept','application/json')
      // Set the cookie in this request which was provided earlier
      .set('Cookie', Cookies)
      .expect(200)
      .end(function (err, res) {
        if (err) throw (err);
        done();
      });
  });

  // Removes the test user that we created
  it('Remove the test user', function (done) {
    // Find by the username set above
    User.findOneAndRemove({username: "testusername"}, function(err, data) {
      if (err) throw (err);
      done();
    })
  });
})

