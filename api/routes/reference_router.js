'use strict'

var express = require('express');


var ATCModel = require('../models/reference/atcModel')
var RDOModel = require('../models/reference/rdoModel')
var ReturnPeriodDao = require('../dao/references/ReturnPeriodDao')

const jwt = require('jsonwebtoken');


var reference_router = express.Router();

reference_router.route("/")

    .get((req, res) => {

    })

reference_router.route("/atc")
    .get((req, res) => {
        ATCModel.find({ "form": req.query.form }, (err, results) => {
            if (!err) {
                res.json({
                    success: true,
                    atcs: results
                })
            } else {
                res.json({
                    success: false,
                    error_code: "0000",
                    error_msg: err
                });
            }
        });
    });

reference_router.route("/rdos")
    .get((req, res) => {
        RDOModel.find({}, (err, rdos) => {
            res.json(rdos);
        })
    })

    .post((req, res) => {
        var datas = req.body;
        RDOModel.insertMany(datas, (err, rdos) => {
            res.json(rdos);
        })
    });

reference_router.route('/return_period')
    .get((req, res) => {
        console.log("Fields :", req.query.fields);
        var query = req.query, fields = '';
        if (query.fields) {
            fields = query.fields.split(',').join(' ');
            query.fields = undefined;
        }
        ReturnPeriodDao.findByFields(query, fields)
            .then((model) => {
                res.json(model)
            }).catch((errors) => {
                res.json(errors)
            });
    })
    .post((req, res) => {
        if (req.query && req.query.mode === 'update') {
            if (req.query.id) {
                var data = req.body;
                if (req.headers.access_token && jwt.decode(req.headers.access_token) && jwt.decode(req.headers.access_token).account_id) {
                    data.modified_by = jwt.decode(req.headers.access_token).account_id;
                } else data.modified_by = 'admin'
                ReturnPeriodDao.modifyById(req.query.id, data)
                    .then((model) => {
                        res.json({
                            success: true,
                            model
                        })
                    }).catch((errors) => {
                        res.json({
                            success: false,
                            errors
                        })
                    });
            } else {
                res.send("Required query 'id'.");
            }
        } else {
            var data = req.body;
            if (req.headers.access_token && jwt.decode(req.headers.access_token) && jwt.decode(req.headers.access_token).account_id) {
                data.created_by = jwt.decode(req.headers.access_token).account_id;
            } else data.created_by = 'admin'
            var errors = null;
            ReturnPeriodDao.findOneByForm(data.form)
                .then((existing_form) => {
                    if (existing_form) {
                        errors = [{
                            message: "Form already exist in reference."
                        }]
                    } else {
                        return ReturnPeriodDao.create(data);
                    }
                })
                .then((model) => {
                    res.json({
                        success: !errors,
                        model,
                        errors
                    })
                }).catch((errors) => {
                    res.json({
                        success: false,
                        errors
                    })
                });
        }
    })

module.exports = reference_router;