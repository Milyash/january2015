var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    EventSchema = require('./event.js');

var SeekSchema = EventSchema.extend({
    time_to: Number
});

SeekSchema.methods.createSeek = function createEvent(time, time_to, video) {
    this.time = time;
    this.time_to = time_to;
    this.video = video;

    console.log(this);
};

SeekSchema.methods.saveSeek = function saveEvent() {
    this.save(function (err) {
        if (err) res.send(err);
        res.json({message: 'Seek created!'});
    });
};

SeekSchema.statics.findSeek = function findEvent() {
    var s = [];
    this.find(
        {"_type": "Seek"},
        function (err, seeks) {
            if (err) res.send(err);
            s = seeks;
        });
    return s;
};

module.exports = mongoose.model('Seek', SeekSchema);