/**
 * Created by Milya on 10.12.2014.
 */
var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    webpages: [{type: Schema.Types.ObjectId, ref: 'Webpage'}],
    email: String,
    username: String,
    password: String
});

mongoose.model('User', UserSchema);

module.exports = UserSchema;