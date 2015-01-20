/**
 * Created by Milya on 10.12.2014.
 */
var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var WebpageSchema = new Schema({
    //videos: [{type: Schema.Types.ObjectId, ref: 'Video'}],
    name: String,
    url: String,
    token: String,
    active: Boolean
});

module.exports = mongoose.model('Page', WebpageSchema);