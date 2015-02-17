/**
 * Created by Milya on 10.12.2014.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Page = require('./../models/page');
var Video = require('./../models/video');
var Event = mongoose.model('Event');
var uuid = require('node-uuid');
fs = require('fs');

router
    .get('/', function (req, res) {
        Page.find({'active': true, userId: req.session.userId },
            function (err, webpages) {
                if (err)
                    res.send(err);
                console.log(webpages);
                res.render('page', {webpages: webpages});
            })
    })
    .post('/', function (req, res) {
        var pageId = req.body.page_edit_id;
        Page.findById(pageId,
            function (err, page) {
                if (err) console.log(err);
                if (page == undefined) {
                    res.send(404);
                    return
                }
                page.name = req.body.name;
                page.url = req.body.url;
                page.active = true;
                page.save(function (err) {
                    if (err) {
                        console.log(err)
                        //res.json(err);
                        res.send(err);
                        return
                    }
                    res.json({"message": "Changes saved!"});
                })
            }
        )
        ;
    })
    .delete('/', function (req, res) {
        var pageId = req.body.page_id;
        Page.findById(pageId,
            function (err, page) {
                if (err) console.log(err);
                if (page == undefined) {
                    res.send(404);
                    return
                }

                Video.find({ page: page._id }, function(err, videos) {
                    if(err || !videos) return
                    for(var i in videos) {
                        var video = videos[i]
                        Event.find({ video: video._id }, function(err, evnts) {
                            if(err || !evnts)
                                return
                            for(var i in evnts)
                                evnts[i].remove()
                        })
                        video.remove()
                    }
                })
                page.remove(function (err) {
                    if (err) {
                        res.json(err);
                        return
                    }
                    res.json({"message": "Page removed!"});
                });
            }
        )


    })
    .put('/', function (req, res) {
        var page = new Page();
        page.name = req.body.name;
        page.url = req.body.url;
        page.active = true;
        page.userId = req.session.userId;
        page.token = generate_token(page);
        page.save(function (err) {
            if (err) {
                res.send(err);
                return
            }
            res.json({"message": "Changes saved!"});
        })
    })

    .get('/snipet/:id', function (req, res) {
        var pageId = req.params.id;
        Page.findById(pageId,
            function (err, page) {
                if (err) console.log(err);
                if (page == undefined || page == null) console.log('Page is not found!');
                res.json({ "snipet": '<script src="//' + req.headers.host + '/scripts/snipet.js"></script>\n' +
                    '<script>initSnippet("' +page.token +'")</script>'})
            });
    })

    .get('/:id', function (req, res) {
        var pageId = req.params.id;
        Page.findOne({
                '_id': pageId,
                'active': true
            },
            function (err, page) {
                if (err) console.log(err);
                if (page == undefined || page == null) {
                    console.log('Page is not found!');
                    res.render('single_page', {"page": page, "videos": []})
                }
                else{
                    console.log(page.videos);
                    Video.find({'_id': {$in: page.videos}},
                    function (err, videos) {
                        console.log(videos);
                        res.render('single_page', {"page": page, "videos": videos})

                    });
                }
            });
    });

function generate_token(page) {
    return uuid.v4();
}

module.exports = router;