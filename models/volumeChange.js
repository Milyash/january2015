var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    EventSchema = require('./event.js');

var VolumeChangeSchema = EventSchema.extend({
	from_volume : Number,
	to_volume : Number,
});

module.exports = mongoose.model('VolumeChange', VolumeChangeSchema);