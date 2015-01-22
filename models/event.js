var mongoose = require('mongoose')
var Webpage = require

var Schema = mongoose.Schema;

var EventSchema = new Schema({
    time: Number,
    //watch: {type: Schema.ObjectId, ref: "Watch", childPath: "events"}
    video: {type: Schema.ObjectId, ref: "Video", childPath: "events"}
}, {collection: 'events', discriminatorKey: '_type'});



mongoose.model('Event', EventSchema);
module.exports = EventSchema;