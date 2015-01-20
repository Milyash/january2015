/**
 * Created by Milya on 10.12.2014.
 */
var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}],
    name: String,
    url: String
});

mongoose.model('Webpage', WebpageSchema);

module.exports = WebpageSchema;