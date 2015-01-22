var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    EventSchema = require('./event.js');

var VolumeChangeSchema = EventSchema.extend({
    from_volume: Number,
    to_volume: Number
});

VolumeChangeSchema.methods.createVolumeChange = function createEvent(time, from_volume, to_volume, video) {
    this.time = time;
    this.from_volume = from_volume;
    this.to_volume = to_volume;
    this.video = video;

    console.log(this);
};

VolumeChangeSchema.methods.saveVolumeChange = function saveEvent() {
    this.save(function (err) {
        if (err) res.send(err);
        res.json({message: 'VolumeChange created!'});
    });
};

VolumeChangeSchema.statics.findVolumeChange = function findEvent() {
    var v = [];
    this.find(
        {"_type": "VolumeChange"},
        function (err, volumeChanges) {
            if (err) res.send(err);
            v = volumeChanges;
        });
    return v;
};

module.exports = mongoose.model('VolumeChange', VolumeChangeSchema);