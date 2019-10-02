'use strict'

var request = require('request');
var express = require('express');
var path = require('path');
const jwt = require('jsonwebtoken');

const TaxpayerDao = require('../dao/TaxpayerDao');

var router = express.Router();

router.route("/")
    .get((req, res) => {
        TaxpayerDao.findAll()
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
        TaxpayerDao.create(data)
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

router
    .route('/tin')
    .get((req, res) => {
        console.log('req.query.tin :', req.query.tin);
        TaxpayerDao.searchByTIN(req.query.tin)
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

router
    .route('/tin/:tin')
    .get((req, res) => {
        TaxpayerDao.findOneByTIN(req.params.tin)
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