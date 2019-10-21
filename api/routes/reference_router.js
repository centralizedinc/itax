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
        var rdo = new RDOModel(req.body);
        rdo.save((err) => {
            res.json(rdo);
        });

    });

reference_router.route('/return_period')
    .get((req, res) => {
        ReturnPeriodDao.findAll()
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
    })
    .post((req, res) => {
        var data = req.body;
        data.created_by = jwt.decode(req.headers.access_token).account_id;
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
    })

module.exports = reference_router;