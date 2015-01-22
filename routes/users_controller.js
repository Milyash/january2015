var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../lib/utils');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res) {
  res.render('login');
});
router.post('/login', function(req, res) {
  User.find({
    login: req.body.login,
    password: req.body.password
  }, function(err, user) {
    if(!user) {
      res.render('login', { flash: "Auth error" })
    }
    else res.render('login', { flash: "Ok" })
  })
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  var user = new User();
  user.email = req.body.email
  user.password = req.body.password
  user.save(function (err) {
    if (err)
      return res.render('register', { flash: 'error' });
    utils.sendEmail(user.email, "Register", 'You are registered')
  });
});

module.exports = router;
