var mongoose = require('mongoose')
var Webpage = require

var Schema = mongoose.Schema;

var EventSchema = new Schema({
  video_url: String,
  video_id: String,
  time : Number
}, { collection : 'events', discriminatorKey : '_type' });

mongoose.model('Event', EventSchema);

module.exports = EventSchema;