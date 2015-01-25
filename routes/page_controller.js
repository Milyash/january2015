/**
 * Created by Milya on 10.12.2014.
 */
var express = require('express');
var router = express.Router();
var Page = require('./../models/page');
var Video = require('./../models/video');
var uuid = require('node-uuid');
fs = require('fs');

router
    .get('/', function (req, res) {
        Page.find({'active': true},
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
                page.active = false;
                page.save(function (err) {
                    if (err) {
                        res.json(err);
                        return
                    }
                    res.json({"message": "Changes saved!"});
                })
            }
        )


    })
    .put('/', function (req, res) {
        var page = new Page();
        page.name = req.body.name;
        page.url = req.body.url;
        page.active = true;
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
                fs.readFile('snipet/snipet.js', 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    data = data.replace(/\|\|/, page.token);
                    res.json({"snipet": data});
                });
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