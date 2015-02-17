var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../lib/utils');


// for using at /login and /register pages
function isNotAuth(req,res,next){
    if(req.session.userId)
        res.render('sessionExist');
    else
        next()
}

router.get('/login', isNotAuth, function (req, res) {
    res.render('login');
});
router.post('/login', isNotAuth, function (req, res) {
    User.findOne({
        login: req.body.login,
        password: req.body.password
    }, function (err, user) {
        if (!user) {
            res.render('login', {flash: "Auth error"})
            return
        }
        req.session.userId = user.id
        res.redirect(req.session.requestedUrl ? req.session.requestedUrl : '/page')
    })
});

router.get('/logout', function (req, res) {
    req.session.userId = null
    req.session.user = null
    res.redirect('/')
});

router.get('/register', isNotAuth, function (req, res) {
    console.log("userId: " + req.session.userId)
    res.render('register');
});

router.post('/register', isNotAuth, function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err)
            return res.render('register', {flash: 'error'});
        utils.sendEmail(user.email, "Register", 'You are registered')
        req.session.userId = user._id
        res.redirect('/page')
    });
});

module.exports = router;
