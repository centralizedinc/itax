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
const ReturnPeriodDao = require('../dao/references/ReturnPeriodDao');
const CommonValidator = require('../validators/commonValidator');

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
        const account_id = jwt.decode(req.headers.access_token).account_id;
        const form_type = req.params.form_type;
        console.log(`validation form details(${form_type}) :`, req.body)
        ReturnPeriodDao.findOneByForm(form_type)
            .then((reference) => {
                if (reference) {
                    // Validate and compute return period and due date first
                    var data = CommonValidator.validateReturnPeriod(reference, req.body);
                    console.log('validated return period errors :', data.errors);
                    if (data.errors && data.errors.length) {
                        res.json({ success: false, errors: data.errors });
                    } else {
                        // validation
                        var { errors, form_details } = validateForm(form_type, data.form);
                        console.log(`Form ${form_type} errors :`, errors);

                        // check if the error is only late filing
                        var onlyLatefiling = false;
                        if(errors && errors.length){
                            onlyLatefiling = errors.findIndex(v => v.field.indexOf('latefiling') === -1) === -1
                            console.log('onlyLatefiling :', onlyLatefiling);
                        }

                        // check the errors
                        if (!errors || !errors.length || (Object.keys(errors).length === 0 && errors.constructor === Object) || onlyLatefiling) {
                            // save if there is no error
                            form_details.tax_type = reference.form_type;
                            form_details.created_by = jwt.decode(req.headers.access_token).account_id;
                            console.log(`save form(${form_type}) :`, form_details);
                            saveForm(form_type, form_details, account_id)
                                .then((model) => {
                                    // include errors for latefiling status
                                    res.json({ success: true, model, errors });
                                }).catch((errors) => {
                                    res.status(500).json({ success: false, errors });
                                });
                        } else {
                            // return the errors
                            res.json({ success: false, errors });
                        }
                    }
                } else {
                    res.json({
                        success: false,
                        errors: [{
                            message: "Invalid Form Type"
                        }]
                    })
                }
            }).catch((err) => {

            });
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