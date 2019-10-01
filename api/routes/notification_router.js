'use strict'

var request = require('request');
var express = require('express');
var path = require('path');
var send_email = require('../utils/email');

var notification_router = express.Router();

notification_router.route("/registration")
    .post((req, res) => {
        var email_add = req.body.email_add
        // send_email.registration(email_add, (response)=>{
        res.sendStatus(200);
        // });
    });


module.exports = notification_router;