'use strict'

var request = require('request');
var express = require('express');
var path = require('path');

var user_router = express.Router();
var UserDetailsModel = require('../models/userDetails');

user_router.route("/")

    .get((req, res) => {
        res.sendStatus(200);
    })

    .post((req, res) => {
        var user = new UserDetailsModel(req.body);

        user.save((err)=>{
            if(err){
                return res.send(err);
            }else{
                res.json(user);
            }
        })
    });

module.exports = user_router;