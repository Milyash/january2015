/**
 * Created by Milya on 10.12.2014.
 */
var express = require('express');
var router = express.Router();
var Page = require('./../models/page');
fs = require('fs');

router
    .get('/', function (req, res) {
        Page.find({'active': true},
            function (err, webpages) {
                if (err)
                    res.send(err);
                console.log(webpages);
                res.render('page', {"webpages": webpages});
            })
    })
    .post('/', function (req, res) {
        var pageId = req.body.page_edit_id;
        Page.findById(pageId,
            function (err, page) {
                if (err) console.log(err);
                if (page != undefined) {
                    console.log(page);
                    if (!check_correctness(page).is_correct)
                        res.json({"message": check_correctness(page).message});
                    else {
                        page.name = req.body.name;
                        page.url = req.body.url;
                        page.active = true;
                        page.save(function (err) {
                            if (err)
                                res.send(err);
                            res.json({"message": "Changes saved!"});
                        })
                    }
                } else {
                    res.json({"message": "Error: The page is not found!"})
                }
            }
        )
        ;
    })
    .delete('/', function (req, res) {
        var pageId = req.body.page_id;
        console.log("!");
        Page.findById(pageId,
            function (err, page) {
                if (err) console.log(err);
                if (page != undefined) {
                    page.active = false;
                    page.save(function (err) {
                        if (err)
                            res.send(err);
                        res.json({"message": "Changes saved!"});
                    })
                }
                else {
                    res.json({"message": "Error: The page is not found!"})
                }
            }
        )


    })
    .put('/', function (req, res) {
        var page = new Page();
        page.name = req.body.name;
        page.url = req.body.url;
        page.active = true;
        page.token = generate_token(page);
        if (!check_correctness(page).is_correct)
            res.json({"message": check_correctness(page).message});
        else {
            page.save(function (err) {
                if (err)
                    res.send(err);
                res.json({"message": "Changes saved!"});
            })
        }
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
                if (page == undefined || page == null) console.log('Page is not found!');
                console.log(page);
                res.render('single_page', {"page": page})
            });
    })

function check_correctness(page) {

    //check name
    //check url(format, if exists in database)
    return {"is_correct": true, "message": ""};
}

function generate_token(page) {
    return page.url + page.name;
}
module.exports = router;