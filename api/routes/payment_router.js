'use strict'

const express = require('express');

const router = express.Router();

// utils
const jwt = require('jsonwebtoken');

// dao
const PaymentDao = require('../dao/PaymentDao');
const ReturnDetailsDao = require('../dao/ReturnDetailsDao');

router.route("/")
    .get((req, res) => {
        PaymentDao.findAll()
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
        const created_by = jwt.decode(req.headers.access_token).account_id;
        const data = req.body;
        data.created_by = created_by;
        var payments = {};
        PaymentDao.create(data)
            .then((result) => {
                payments = result;
                return ReturnDetailsDao.modifyOne({ reference_no: data.references[0] }, { payment_status: 'paid' })
            })
            .then((return_details) => {
                res.json({
                    success: true,
                    model: {
                        payments,
                        return_details
                    }
                })
            }).catch((errors) => {
                res.json({
                    success: false,
                    errors
                })
            });
    })

router.route("/multiple")
    .post((req, res) => {
        const created_by = jwt.decode(req.headers.access_token).account_id;
        const data = req.body;
        data.created_by = created_by;
        var payments = {};
        PaymentDao.create(data)
            .then((results) => {
                payments = results;
                return ReturnDetailsDao.modify({ reference_no: { $in: data.references } }, { payment_status: 'paid' })
            })
            .then((return_details) => {
                res.json({
                    success: true,
                    model: {
                        payments,
                        return_details
                    }
                })
            }).catch((errors) => {
                res.json({
                    success: false,
                    errors
                })
            });

    })


module.exports = router;