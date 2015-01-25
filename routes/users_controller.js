var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../lib/utils');

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.get('/login', function (req, res) {
    res.render('login');
});
router.post('/login', function (req, res) {
    User.findOne({
        login: req.body.login,
        password: req.body.password
    }, function (err, user) {
        if (!user) {
            res.render('login', {flash: "Auth error"})
            return
        }
        req.session.userId = user.id
        res.redirect('/page')
    })
});

router.get('/logout', function (req, res) {
    req.session.userId = null
    res.redirect('/')
});

router.get('/register', function (req, res) {
    console.log("userId: " + req.session.userId)
    res.render('register');
});

router.post('/register', function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err)
            return res.render('register', {flash: 'error'});
        utils.sendEmail(user.email, "Register", 'You are registered')
        req.session.userId = user._id
        res.render('register', {flash: 'You are registered'});
    });
});

module.exports = router;
