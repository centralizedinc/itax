'use strict'

var request = require('request');
var express = require('express');
var path = require('path');

var payment_router = express.Router();

payment_router.route("/")

    .get((req, res) => {

    })


module.exports = payment_router;