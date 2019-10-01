'use strict'

var request = require('request');
var express = require('express');
var path = require('path');
var async = require('async');
var send_email = require('../utils/email');

var TaxpayerModel = require('../models/taxpayerDetailsModel')
var UserModel = require('../models/userDetails')

var profile_router = express.Router();
var bcrypt = require('bcrypt-nodejs');

profile_router.route("/")

    .get((req, res) => {
        TaxpayerModel.findOne({ "tin": req.query.tin }, (err, resp) => {

            if (!err) {
                res.json({
                    success: true,
                    error_code: "0000",
                    data: resp
                });
            } else {
                res.json({
                    success: false,
                    error_code: "0000",
                    error_msg: err
                });
            }

        });
    });

profile_router.route("/register")

    .post((req, res) => {
        var profile = req.body;

        async.parallel([
            function (callback) {
                //save taxpayer
                var tp = new TaxpayerModel(profile.taxpayer_details);
                tp.save((err) => {
                    console.log(tp);
                    callback(err);
                });

            },
            function (callback) {
                //save user details
                var user = new UserModel(profile.user_details);
                user.save((err) => {
                    console.log(user);
                    callback(err);
                });
            }
        ], function (err) {
            if (err) {
                //rollback

            } else {
                //no error send email
                send_email.registration(profile.taxpayer_details.contact_details.email)
            }
        });
    });

profile_router.route("/update")

    .post((req, res) => {
        var profile = req.body;

        async.parallel([
            function (callback) {
                //save taxpayer
                TaxpayerModel.findOneAndUpdate({ tin: profile.taxpayer_details.tin }, profile.taxpayer_details, { new: true }, (err, doc) => {
                    console.log(doc);
                    if (err) {
                        callback({
                            success: false,
                            error_msg: err,
                            error_code: "00001"
                        })
                    } else {
                        callback();
                    }
                });

            },
            function (callback) {
                //save user details
                UserModel.findOneAndUpdate({ tin: profile.user_details.tin }, { $set: { username: profile.user_details.username } }, { new: true }, (err, doc) => {
                    if (err) {
                        callback({
                            success: false,
                            error_msg: err,
                            error_code: "00001"
                        })
                    } else {
                        callback();
                    }
                });
            }
        ], function (err) {
            if (err) {
                //rollback
                console.log("error in updating profile: " + JSON.stringify(err));
                res.json({
                    success: false,
                    error_code: "00010",
                    error_msg: err
                });
            } else {
                //no error send email
                send_email.updateProfile(profile.taxpayer_details.contact_details.email);
                res.json({
                    success: true,
                    error_code: "00000",
                    error_msg: null
                });
            }
        });
    });

profile_router.route("/password")
    .post((req, res) => {
        var user_details = req.body;
        var userModel = {};
        var password_matched = false;

        async.series([
            //find user
            (callback) => {
                console.log("finding user details ...");
                UserModel.findOne({ username: user_details.username }, (err, doc) => {
                    if (err) {
                        console.log("finding user details ..." + err);
                        return callback({ error: err, error_msg: "No user found." });
                    } else {
                        console.log("finding user details ..." + doc);
                        userModel = doc;
                        return callback();
                    }
                });
            },
            //verify password
            (callback) => {
                console.log("verify user credentials ...");
                if (!userModel) {
                    return callback({ error_msg: "No user found." });
                }
                var user_model = new UserModel(userModel);
                user_model.verifyPassword(userModel.password, (err, result) => {
                    if (err) {
                        console.log("verify user credentials ..." + err);
                        return callback({ error: err, error_msg: "Invalid old password." });
                    } else {
                        console.log("verify user credentials ..." + err);
                        password_matched = result;
                        return callback();
                    }
                });
            },
            //update password
            (callback) => {
                // if(!password_matched){
                //     return callback({error_msg:"Invalid old password."});
                // }
                bcrypt.genSalt(5, function (err, salt) {
                    if (err) return callback(err);

                    bcrypt.hash(user_details.new_password, salt, null, function (err, hash) {
                        if (err){
                            return callback(err);
                        } else{
                            UserModel.findOneAndUpdate({ username: user_details.username }, { $set: { password:hash} }, { new: true }, (err, doc) => {
                                if (err) {
                                    return callback({ error: err, error_msg: "Cannot Update user password." });
                                } else {
                                    return callback();
                                }
                            });
                        }
                    });
                });

                
            }
        ], (err) => {
            if (err) {
                res.json({ success: false, error_msg: err.error_msg, error: err.error });
            } else {
                //send email
                send_email.updateProfile(null);
                res.json({
                    success: true,
                    error_code: "00000",
                    error_msg: null
                });
            }
        });
    });


module.exports = profile_router;