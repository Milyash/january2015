/**
 * Created by Milya on 10.12.2014.
 */
var mongoose = require('mongoose');
var VideoSchema = require('./video');
var relationship = require("mongoose-relationship");
var Schema = mongoose.Schema;

var WebpageSchema = new Schema({
    name: {type: String, trim: true},
    url: {type: String, unique: true, lowercase: true, trim: true},
    token: String,
    active: Boolean,
    videos: [{type: Schema.ObjectId, ref: "Video"}]
});

WebpageSchema.path('name').validate(function (value) {
    return /[a-zA-Z0-9\\\-\ ]+/.test(value);
}, 'Invalid name');

WebpageSchema.path('url').validate(function (value) {
    return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value);
}, 'Invalid url');

WebpageSchema.path('url').validate(function(value, done) {
    if (this.isNew || this.isModified('url')) {
        this.model('Page').count({ url: value }, function(err, count) {
            done(!err && !count);
        });
    } else done(true);
}, 'Url already exists');

module.exports = mongoose.model('Page', WebpageSchema);