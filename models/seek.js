var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    EventSchema = require('./event.js');

var SeekSchema = EventSchema.extend({
	time_to : Number
});

module.exports = mongoose.model('Seek', SeekSchema);