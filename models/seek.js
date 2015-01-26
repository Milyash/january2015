var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    EventSchema = require('./event.js');
var relationship = require("mongoose-relationship");

var SeekSchema = EventSchema.extend({
    time_to: Number
});

SeekSchema.methods.createSeek = function createEvent(time, time_to, video) {
    if (video) {
        this.time = time;
        this.time_to = time_to;
        this.video = video;
    } else {
        this.time = null;
        this.time_to = null;
        this.video = null;
    }
    console.log(this);
};

SeekSchema.methods.saveSeek = function saveEvent(req, res) {
    if (this.video)
        this.save(function (err) {
            if (err) res.send(err);
            console.log('Seek created!');
        });
    else
        console.log("Play is not created!");
};

SeekSchema.statics.findSeek = function findEvent(next) {
    this.find(
        {"_type": "Seek"},
        function (err, seeks) {
            if (err) res.send(err);
            next(seeks)
        });
};

SeekSchema.plugin(relationship, {relationshipPathName: 'video'});
module.exports = mongoose.model('Seek', SeekSchema);