/**
 * Created by Milya on 26.01.2015.
 */
var express = require('express');
var router = express.Router();
var Page = require('./../models/page');
var Video = require('./../models/video');

router
    .get('/', function (req, res) {
        Video.find({},
            function (err, videos) {
                if (err)
                    res.send(err);
                console.log(videos);
                res.render('video', {videos: videos});
            })
    });

module.exports = router;