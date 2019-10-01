'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserDetailsSchema = new Schema({
        user_id: Number,
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        tin: String,
        date_registered: Date,
        status: String
});

// Execute before each user.save() call
UserDetailsSchema.pre('save', function (callback) {
        var user = this;
        // Break out if the password hasn't changed
        if (!user.isModified('password')) return callback();

        // Password changed so we need to hash it
        bcrypt.genSalt(5, function (err, salt) {
                if (err) return callback(err);

                bcrypt.hash(user.password, salt, null, function (err, hash) {
                        if (err) return callback(err);
                        user.password = hash;
                        callback();
                });
        });
});


// Execute before each user.findOneAndUpdate() call
UserDetailsSchema.pre('findOneAndUpdate', function (callback) {
        var user = this;
        // Break out if the password hasn't changed
        // if (!user.isModified('password')) return callback();

        // Password changed so we need to hash it
        bcrypt.genSalt(5, function (err, salt) {
                if (err) return callback(err);

                bcrypt.hash(user.password, salt, null, function (err, hash) {
                        if (err) return callback(err);
                        user.password = hash;
                        callback();
                });
        });
});

UserDetailsSchema.methods.verifyPassword = function (password, cb) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
                if (err) return cb(err);
                cb(null, isMatch);
        });
};


module.exports = mongoose.model('user_details', UserDetailsSchema);