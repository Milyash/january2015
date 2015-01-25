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
var http = require('http');
var VolumeChange = require('../models/volumeChange');
var mongoose = require('mongoose');
var Event = mongoose.model('Event');


function createPlay(request, next) {
    getPage(request, next);
}

function getPage(request, next) {
    var token = request.body.token;
    Page.findOne({'token': token},
        function (err, page) {
            if (err) console.log(err);
            if (page == undefined || page == null) {
                console.log('Page is not found! Dont accept data!');
            }
            else
                getVideo(page, request, next);
        });
}

function setVideoThumbnail(video) {
    var videoId = video.url.match(/vimeo\.com\/video\/(\d+)/)[1];
    console.log(videoId + " /////////////");
    if (videoId != null || videoId != undefined || videoId != "") {
        var options = {
            hostname: 'vimeo.com',
            path: '/api/v2/video/' + videoId + '.json',
            method: 'GET'
        };

        http.get(options, function (res) {
            var data = "";
            res.setEncoding('utf8');
            res.on("data", function (chunk) {
                data += chunk;
            });
            res.on("end", function(){
                var videoData = JSON.parse(data);
                 if (videoData.length == 1) {
                 video.picture = videoData[0].thumbnail_medium;
                 video.save();
                 }
                 console.log(video + " updated!");
            })

        });
    }
}

function getVideo(page, request, next) {
    var url = request.body.video_url;
    url.trim();
    //delete protocol http://, delete ending / , ...
    //url.replace()
    Video.findOne({'url': url},
        function (err, video) {
            if (err) console.log(err);
            if (video == undefined || video == null) {
                console.log('Video is not found! Create entry!');
                video = new Video();
                video.name = request.body.video_name;
                video.url = url;
                video.page = page._id;
                video.events = [];
                video.save(function (err) {
                    if (err) res.send(err);
                    console.log('Video created!');
                });
                setVideoThumbnail(video);
                console.log("Video creating" + video);

            }
            else console.log('Page is not found!');
            next(video);
        }
    )
}


router
    .post('/play', function (req, res) {
        var play = new Play();
        createPlay(req, function (video) {
            play.createPlay(req.body.time, video);
            play.savePlay(req, res);
        });
    })

    .post('/pause', function (req, res) {
        var pause = new Pause();
        pause.createPause(req.body.time, getVideo(req));
        pause.savePause();
    })
    .post('/seek', function (req, res) {
        var seek = new Seek();
        seek.createSeek(req.body.time, req.body.time_to, getVideo(req));
        seek.saveSeek();
    })
    .post('/volumechange', function (req, res) {
        var volumeChange = new VolumeChange();
        volumeChange.createVolumeChange(req.body.time, req.body.from_volume, req.body.to_volume, getVideo(req));
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
    })
    .get('/page/:id', function (req, res) {
        Page.findOne({'_id': req.params.id})
            .populate('videos')
            .exec(function (err, videos) {
                res.json(videos);
            })
    });

module.exports = router;