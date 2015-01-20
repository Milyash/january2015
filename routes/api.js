/**
 * Created by Milya on 16.12.2014.
 */
var express = require('express');
var router = express.Router();
var Pause = require('../models/pause');
var Play = require('../models/play');
var Seek = require('../models/seek');
var VolumeChange = require('../models/volumeChange');

router.post('/pauses', function (req, res) {
    var pause = new Pause(req.body);
    pause.save(function (err) {
        if (err) res.send(err);
        res.json({message: 'Pause created!'});
    });
})
    .get('/pauses', function (req, res) {
        Pause.find({"_type": "Pause"},
            function (err, pauses) {
                if (err) res.send(err);
                res.json(pauses);
            });
    })

    .post('/plays', function (req, res) {
        var play = new Play(req.body);
        play.save(function (err) {
            if (err) res.send(err);
            res.json({message: 'Play created!'});
        });
    })

    .get('/plays', function (req, res) {
        Play.find(
            {"_type": "Play"},
            function (err, plays) {
                if (err) res.send(err);
                res.json(plays);
            });
    })

    .post('/seeks', function (req, res) {
        var seek = new Seek(req.body);
        seek.save(function (err) {
            if (err) res.send(err);
            res.json({message: 'Seek created!'});
        });
    })

    .get('/seeks', function (req, res) {
        Seek.find({"_type": "Seek"},
            function (err, seeks) {
                if (err)res.send(err);
                res.json(seeks);
            });
    })
    .post('/volumechanges', function (req, res) {
        var volumeChange = new VolumeChange(req.body);
        volumeChange.save(function (err) {
            if (err) res.send(err);
            res.json({message: 'VolumeChange created!'});
        });
    })

    .get('/volumechanges', function (req, res) {
        VolumeChange.find({"_type": "VolumeChange"},
            function (err, volumechanges) {
                if (err)res.send(err);
                res.json(volumechanges);
            });
    });

module.exports = router;