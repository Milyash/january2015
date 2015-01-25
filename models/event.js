var mongoose = require('mongoose');
var Webpage = require;
var relationship = require("mongoose-relationship");

var Schema = mongoose.Schema;

var EventSchema = new Schema({
    time: Number,
    //watch: {type: Schema.ObjectId, ref: "Watch", childPath: "events"}
    video: {type: Schema.ObjectId, ref: "Video", childPath: "events"}
}, {collection: 'events', discriminatorKey: '_type'});



EventSchema.plugin(relationship, {relationshipPathName: 'video'});
mongoose.model('Event', EventSchema);
module.exports = EventSchema;