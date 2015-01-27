var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    EventSchema = require('./event.js');
var relationship = require("mongoose-relationship");

var VolumeChangeSchema = EventSchema.extend({
    from_volume: Number,
    to_volume: Number
});

VolumeChangeSchema.methods.createVolumeChange = function (time, from_volume, to_volume, video) {
    if (video) {
        this.time = time;
        this.from_volume = from_volume;
        this.to_volume = to_volume;
        this.video = video;
    } else {
        this.time = null;
        this.from_volume = null;
        this.to_volume = null;
        this.video = null;
    }
    console.log(this);
};

VolumeChangeSchema.methods.saveVolumeChange = function () {
    if (this.video)
        this.save(function (err) {
            if (err) res.send(err);
            console.log('VolumeChange created!');
        });
    else
        console.log("Play is not created!");
};

VolumeChangeSchema.statics.findVolumeChange = function (options, next) {
    var opts = options || {};
    opts._type = 'VolumeChange';
    this.find(
        opts,
        function (err, volumeChanges) {
            if (err) res.send(err);
            next(volumeChanges);
        });
};

VolumeChangeSchema.plugin(relationship, {relationshipPathName: 'video'});
module.exports = mongoose.model('VolumeChange', VolumeChangeSchema);