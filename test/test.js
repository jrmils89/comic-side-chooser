var request = require('supertest');
var express = require('express');
var app = express();
var url = 'http://localhost:3000';
var User = require('../models/user');
require('../server');


describe('GET /marvel', function(){
  it('GET /marvel', function(done){
    request(url).get('/marvel')
      .expect(200, done);
  })
});


describe('GET /dc', function(){
  it('GET /marvel', function(done){
    request(url).get('/dc')
      .expect(200, done);
  })
});

describe('CREATE USER', function() {
  var Cookies;
  it('TEST /signup', function(done) {
    request(url)
    .post('/signup')
    .send({"email": "user_test@example.com", "password":"123", "username":"testusername"})
    .set('Accept','application/json')
    .expect(200)
    .end(function(err, res) {
      if (err) throw (err);
      Cookies = res.headers['set-cookie'];
      done();
    })
  })

  it('GET /profile/testusername', function (done) {
    request(url).get('/profile/testusername')
      .set('Accept','application/json')
      .set('Cookie', Cookies)
      .expect(200)
      .end(function (err, res) {
        if (err) throw (err);
        done();
      });
  });

  it('Remove the test user', function (done) {
    User.findOneAndRemove({username: "testusername"}, function(err, data) {
      if (err) throw (err);
      done();
    })
  });

})

