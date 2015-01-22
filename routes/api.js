/**
 * Created by Milya on 16.12.2014.
 */
var express = require('express');
var router = express.Router();
var Pause = require('../models/pause');
var Play = require('../models/play');
var Seek = require('../models/seek');
var Video = require('../models/video');
var Page = require('../models/page');
var VolumeChange = require('../models/volumeChange');

function getPage(token) {
    var p = null;
    Page.findOne({'token': token},
        function (err, page) {
            if (err) console.log(err);
            if (video == undefined || page == null) {
                console.log('Page is not found! Dont accept data!');
            }
            else
                p = page;
        });
    return p;
}

function getVideo(url) {
    url.trim();
    //delete protocol http://, delete ending / , ...
    //url.replace()
    var video = null;
    Video.findOne({'url': url},
        function (err, video) {
            if (err) console.log(err);
            if (video == undefined || page == null) {
                console.log('Video is not found! Create entry!');
                video = new Video();
                video.name = "New Page on the page";
                video.url = req.body.url;
                video.page = getPage(req.body.token);
                video.picture = "none";
                video.events = [];
                video.save(function (err) {
                    if (err) res.send(err);
                    console.log('Video created!');
                });
            }
        });
    return video;
}

router
    .post('/play', function (req, res) {
        var play = new Play();
        play.createPlay(req.body.time, getVideo(req.body.video_url));
        play.savePlay();
    })

    .post('/pause', function (req, res) {
        var pause = new Pause();
        pause.createPause(req.body.time, getVideo(req.body.video_url));
        pause.savePause();
    })
    .post('/seek', function (req, res) {
        var seek = new Seek();
        seek.createSeek(req.body.time, req.body.time_to, getVideo(req.body.video_url));
        seek.saveSeek();
    })
    .post('/volumechange', function (req, res) {
        var volumeChange = new VolumeChange();
        volumeChange.createVolumeChange(req.body.time, req.body.from_volume, req.body.to_volume, getVideo(req.body.video_url));
        volumeChange.saveVolumeChange();
    })

    .get('/play', function (req, res) {
        var plays = Play.findPlay();
        res.json(plays);
    })
    .get('/pause', function (req, res) {
        var pauses = Pause.findPauses();
        res.json(pauses);
    })
    .get('/seek', function (req, res) {
        var seeks = Seek.findSeek();
        res.json(seeks);
    })
    .get('/volumechange', function (req, res) {
        var volumeChanges = VolumeChange.findVolumeChange();
        res.json(volumeChanges);
    });

module.exports = router;