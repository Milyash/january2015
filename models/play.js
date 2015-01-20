var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    EventSchema = require('./event.js');

var PlaySchema = EventSchema.extend({

});

module.exports = mongoose.model('Play', PlaySchema);