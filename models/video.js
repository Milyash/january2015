/**
 * Created by Milya on 10.12.2014.
 */
var mongoose = require('mongoose');
var relationship = require("mongoose-relationship");
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    name: String,
    url: String,
    page: {type: Schema.ObjectId, ref: "Page", childPath: "videos"},
    picture: String,
    //watches: [{type: Schema.Types.ObjectId, ref: 'Watch'}]
    events: [{type: Schema.ObjectId, ref: "Event"}]
});

VideoSchema.methods.createVideo = function createVideo(name, url, page, picture) {
    this.name = name;
    this.url = url;
    this.page = page;
    this.picture = picture;
    this.events = [];
}

VideoSchema.plugin(relationship, {relationshipPathName: 'page'});
module.exports = mongoose.model('Video', VideoSchema);
