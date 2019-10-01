'use strict'

var request = require('request');
var express = require('express');
var path = require('path');

var auth_router = express.Router();

var UserDetailsSchema = require('../models/userDetails');
var TaxpayerDetailsModel = require('../models/taxpayerDetailsModel');

var jwt = require('jsonwebtoken');

var key = 'iT@xAp1S3rv1c3s';

auth_router.route("/")

    .post((req, res) => {
        console.log("#### auth: init " + JSON.stringify(req.body));
        if (req.body.username && req.body.password) {
            var name = req.body.username;
            var password = req.body.password;

            console.log("#### auth: finding user");
            UserDetailsSchema.findOne({ username: name }, (err, user) => {
                if (!user) {
                    //no user
                    console.log("###### error: no user found!");
                } else {
                    user.verifyPassword(password, (err, result) => {
                        if (result) {
                            var payload = { id: user.id };
                            var token = jwt.sign(payload, key);                            

                            //find taxpayer
                            console.log("#### auth: finding taxpayer " + user.tin);
                            TaxpayerDetailsModel.findOne({tin:user.tin},(err, tp)=>{
                                if(err){
                                    console.log("#### err: " + err);
                                } 

                                console.log("#### auth: finding taxpayer " + JSON.stringify(tp));                                
                                res.json({ message: "ok", token: token, user: user, tp: tp });
                            });
                            
                        } else {
                            res.status(401).json({ message: "passwords did not match" });
                        }
                    })
                }
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });


module.exports = auth_router;