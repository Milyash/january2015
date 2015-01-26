/**
 * Created by Milya on 16.12.2014.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var http = require('http');
var Page = require('../models/page');
var Video = require('../models/video');
var Pause = require('../models/pause');
var Play = require('../models/play');
var Seek = require('../models/seek');
var VolumeChange = require('../models/volumeChange');
var Event = mongoose.model('Event');


function createEvent(request, next) {
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
            res.on("end", function () {
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
            next(video);
        }
    )
}


router
    .post('/play', function (req, res) {
        var play = new Play();
        createEvent(req, function (video) {
            play.createPlay(req.body.time, video);
            play.savePlay(req, res);
        });
    })

    .post('/pause', function (req, res) {
        var pause = new Pause();
        createEvent(req, function (video) {
            pause.createPause(req.body.time, video);
            pause.savePause(req, res);
        });
    })
    .post('/seek', function (req, res) {
        var seek = new Seek();
        createEvent(req, function (video) {
            seek.createSeek(req.body.time_from, req.body.time_to, video);
            seek.saveSeek(req, res);
        });
    })
    .post('/volumechange', function (req, res) {
        var volumeChange = new VolumeChange();
        createEvent(req, function (video) {
            volumeChange.createVolumeChange(req.body.time, req.body.from_volume, req.body.to_volume, video);
            volumeChange.saveVolumeChange(req, res);
        });
    })

    .get('/play', function (req, res) {
        Play.findPlay(function (plays) {
            res.json(plays);
        });
    })
    .get('/pause', function (req, res) {
        Pause.findPause(function (pauses) {
            res.json(pauses);
        });
    })
    .get('/seek', function (req, res) {
        Seek.findSeek(function (seeks) {
            res.json(seeks);
        });
    })
    .get('/volumechange', function (req, res) {
        VolumeChange.findVolumeChange(function (volumeChanges) {
            res.json(volumeChanges);
        });
    })
    .get('/video/:id/play', function (req, res) {
        var videoId = req.params.id;
        Video.findOne({"_id":videoId}, function(err,video){
            if (err || !video) res.send(err + video);
            Play.findPlay({"video": video._id}, function (plays) {
                res.json(plays);
            });
        })
    })
    .get('/video/:id/pause', function (req, res) {
        var videoId = req.params.id;
        Video.findOne({"_id":videoId}, function(err,video){
            if (err || !video) res.send(err + video);
            Pause.findPause({"video": video._id}, function (pauses) {
                res.json(plays);
            });
        })
    })
    .get('/video/:id/seek', function (req, res) {
        var videoId = req.params.id;
        Video.findOne({"_id":videoId}, function(err,video){
            if (err || !video) res.send(err + video);
            Seek.findSeek({"video": video._id}, function (seeks) {
                res.json(seeks);
            });
        })
    })
    .get('/video/:id/volumechange', function (req, res) {
        var videoId = req.params.id;
        Video.findOne({"_id":videoId}, function(err,video){
            if (err || !video) res.send(err + video);
            VolumeChange.findVolumeChange({"video": video._id}, function (volumeChanges) {
                res.json(volumeChanges);
            });
        })
    });

module.exports = router;