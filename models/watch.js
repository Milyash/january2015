/**
 * Created by Milya on 22.01.2015.
 */

var mongoose = require('mongoose');
var relationship = require("mongoose-relationship");
var Schema = mongoose.Schema;

var WatchSchema = new Schema({
    date: Date,
    video: {type: Schema.ObjectId, ref: "Video", childPath: "watches"},
    client: {type: String, enum: ['Opera', 'Browser']},
    events: [{type: Schema.ObjectId, ref: "Event"}]
});

mongoose.model('Watch', WatchSchema);

module.exports = VideoSchema;