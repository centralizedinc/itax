'use strict'

var request = require('request');
var express = require('express');
var path = require('path');
const jwt = require('jsonwebtoken');

const TaxpayerDao = require('../dao/TaxpayerDao');
const UserDao = require('../dao/UserDao');

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
        var taxpayer = {}
        console.log('req.params.tin :', req.params.tin);
        TaxpayerDao.findOneByTIN(req.params.tin)
            .then((taxpayer) => {
                console.log('taxpayer :', taxpayer);
                taxpayer = taxpayer;
                return UserDao.findOne({ tin: req.params.tin });
            })
            .then((user) => {
                console.log('user :', user);
                res.json({
                    success: true,
                    model: {
                        taxpayer,
                        user
                    }
                })
            })
            .catch((errors) => {
                res.json({
                    success: false,
                    errors
                })
            });
    })


router.route('/vault/:tin')
    .get((req, res) => {
        TaxpayerDao.find()
            .then()
    })

module.exports = router;