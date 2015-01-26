var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    EventSchema = require('./event.js');
var relationship = require("mongoose-relationship");

var PauseSchema = EventSchema.extend({});

PauseSchema.methods.createPause = function createEvent(time, video) {
    if (video) {
        this.time = time;
        this.video = video;
    } else {
        this.video = null;
        this.time = null;
    }
    console.log(this);
};

PauseSchema.methods.savePause = function saveEvent(req, res) {
    if (this.video)
        this.save(function (err) {
            if (err) res.send(err);
            console.log('Pause created!');
        });
    else
        console.log("Pause is not created!");
};

PauseSchema.statics.findPause = function findEvent(next) {
    this.find(
        {"_type": "Pause"},
        function (err, pauses) {
            if (err) res.send(err);
            next(pauses);
        });
};

PauseSchema.plugin(relationship, {relationshipPathName: 'video'});
module.exports = mongoose.model('Pause', PauseSchema);