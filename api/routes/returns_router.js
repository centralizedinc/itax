'use strict'

var request = require('request');
var express = require('express');
var path = require('path');
const jwt = require('jsonwebtoken');

var returns_router = express.Router();

//services
var saveForm = require('../services/form_service.js').save;
var validateForm = require('../services/validation_service').validate;

var ReturnsDetailsModel = require('../models/ReturnDetailsModel.js');

// Dao
const ReturnDetailsDao = require('../dao/ReturnDetailsDao');

/**
 * route /returns/
 */
returns_router.route("/")
    .get((req, res) => {
        const account_id = jwt.decode(req.headers.access_token).account_id;
        ReturnDetailsDao.findByAccountId(account_id)
            .then((model) => {
                res.json({ model });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })

    .post((req, res) => {
        // var form_type = req.body.form_type;
        // var form_details = req.body.form_details;

        // validation
        // validation_service.validate(form_type, form_details, resp => {

        //     if (resp.success) {
        //         //call persistence layer
        //         form_service.save(form_type, form_details, (response) => {
        //             validation_service                  //return reference number
        //             res.json(response);
        //         });
        //     } else {
        //         res.json(resp.errors);
        //     }
        // });

    });

returns_router.route("/validate/:form_type")
    .post((req, res) => {
        // validation
        const errors = validateForm(req.params.form_type, req.body);
        if (!errors || (Object.keys(errors).length === 0 && errors.constructor === Object)) {
            var data = req.body;
            console.log('jwt.decode(req.headers.access_token).account_id :', jwt.decode(req.headers.access_token).account_id);
            data.created_by = jwt.decode(req.headers.access_token).account_id;
            saveForm(req.params.form_type, data)
                .then((result) => {
                    res.json({ model: result });
                }).catch((err) => {
                    res.json({ errors: err });
                });
        } else {
            res.json({ errors });
        }
    })

returns_router.route("/:tin")

    .get((req, res) => {
        var tin = req.params.tin;

        ReturnsDetailsModel.find({
            "tin": tin
        }, (err, results) => {
            console.log("################# records: " + JSON.stringify(results));
            res.json(results);
        });

    });

module.exports = returns_router;