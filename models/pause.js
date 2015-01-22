var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    EventSchema = require('./event.js');

var PauseSchema = EventSchema.extend({});

PauseSchema.methods.createPause = function createEvent(time, video) {
    this.time = time;
    this.video = video;

    console.log(this);
};

PauseSchema.methods.savePause = function saveEvent() {
    this.save(function (err) {
        if (err) res.send(err);
        res.json({message: 'Play created!'});
    });
};

PauseSchema.statics.findPause = function findEvent() {
    var p = [];
    this.find(
        {"_type": "Pause"},
        function (err, pauses) {
            if (err) res.send(err);
            p = pauses;
        });
    return p;
};

module.exports = mongoose.model('Pause', PauseSchema);