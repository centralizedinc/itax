'use strict'

var request = require('request');
var express = require('express');
var path = require('path');

var validateService = require('../services/validation_service.js');

var validate_router = express.Router();

validate_router.route("/")

    .get((req, res) => {
        res.sendStatus(200);
    })

    .post((req, res) => {
        var form_type = req.body.form_type;
        var form_details = req.body.form_details;


        console.log("form_type: " + form_type);
        console.log("form_details: " + JSON.stringify(form_details));

        validateService.validate(form_type, form_details, (response) => {
            console.log("form_details: " + JSON.stringify(response));
            res.json(response);
        });
    });


module.exports = validate_router;