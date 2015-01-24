/**
 * Created by Milya on 10.12.2014.
 */
var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    webpages: [{type: Schema.Types.ObjectId, ref: 'Webpage'}],
    email: String,
    activated: { type: Boolean, default: false },
    username: String,
    password: String
});


UserSchema.path('password').validate(function (value) {
    return value.length > 3;
}, 'Password is too short')

UserSchema.path('password').validate(function (value) {
    return /[a-zA-Z0-9]+/.test(value);
}, 'Invalid username')

UserSchema.path('email').validate(function (email, done) {
    var User = mongoose.model('User');

    if (this.isNew || this.isModified('email')) {
        User.count({ email: email }).exec(function (err, count) {
            done(!err && !count);
        });
    } else done(true);
}, 'Email already exists');;


module.exports = mongoose.model('User', UserSchema);;