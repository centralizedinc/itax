'use strict'

const express = require('express');

const router = express.Router();

// utils
const jwt = require('jsonwebtoken');

// dao
const PaymentDao = require('../dao/PaymentDao');
const ReturnDetailsDao = require('../dao/ReturnDetailsDao');
const activity = require('../services/actvities_service')

const sendEmail = require('../utils/email');

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
        console.log(`payment_details: `, JSON.stringify(data))
        data.created_by = created_by;
        var payments = {};
        PaymentDao.create(data)
            .then((result) => {
                payments = result;
                return ReturnDetailsDao.modifyOne({ reference_no: data.references[0] }, { payment_status: 'paid' })
            })
            .then((return_details) => {
                activity.pay(return_details.tin, { payments, return_details }, created_by)
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

router.route("/email/:email")
    .post((req, res) => {
        var data = req.body;
        console.log('req.params.email :', req.params.email);
        console.log('data :', data);
        sendEmail.sendEmail(req.params.email, data, "PAYMENT_NOTIFICATION")
            .then((result) => {
                console.log('result :', result);
                res.json(result);
            }).catch((error) => {
                res.json({ error });
            });
    })


router.route("/:id")
    .get((req, res) => {
        PaymentDao.findAllByID(req.params.id)
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
module.exports = router;