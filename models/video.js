/**
 * Created by Milya on 10.12.2014.
 */
var mongoose = require('mongoose');
var relationship = require("mongoose-relationship");
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    name: String,
    url: String,
    page: { type:Schema.ObjectId, ref:"Page", childPath:"videos" },
    picture: String,
    //watches: [{type: Schema.Types.ObjectId, ref: 'Watch'}]
    events: [{type: Schema.ObjectId, ref: "Event"}]
});

mongoose.model('Video', VideoSchema);

module.exports = VideoSchema;