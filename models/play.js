var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    EventSchema = require('./event.js');

var PlaySchema = EventSchema.extend({});

PlaySchema.methods.createPlay = function createEvent(time, video) {
    this.time = time;
    this.video = video;

    console.log(this);
};

PlaySchema.methods.savePlay = function saveEvent() {
    this.save(function (err) {
        if (err) res.send(err);
        res.json({message: 'Pause created!'});
    });
};

PlaySchema.statics.findPlay = function findEvent() {
    var p = [];
    this.find(
        {"_type": "Play"},
        function (err, plays) {
            if (err) res.send(err);
            p = plays;
        });
    return p;
};


module.exports = mongoose.model('Play', PlaySchema);