var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    EventSchema = require('./event.js');
var relationship = require("mongoose-relationship");

var PlaySchema = EventSchema.extend({});

PlaySchema.methods.createPlay = function createEvent(time, video) {
    if (video) {
        this.video = video;
        this.time = time;
    }
    else {
        this.video = null;
        this.time = null;
    }
    console.log(this);
};

PlaySchema.methods.savePlay = function saveEvent(req, res) {
    if (this.video)
        this.save(function (err) {
            if (err) res.send(err);
            console.log('Play created!');
        });
    else
        console.log("Play is not created! Video is missing!");
};

PlaySchema.statics.findPlay = function findEvent(next) {
    this.find(
        {"_type": "Play"},
        function (err, plays) {
            if (err) res.send(err);
            next(plays);
        });
};


PlaySchema.plugin(relationship, {relationshipPathName: 'video'});
module.exports = mongoose.model('Play', PlaySchema);