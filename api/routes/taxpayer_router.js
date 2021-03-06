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
        var model = {}
        console.log('req.params.tin :', req.params.tin);
        console.log('req.query.ignore_user :', req.query.ignore_user);
        TaxpayerDao.findOneByTIN(req.params.tin)
            .then((taxpayer) => {
                model.taxpayer = taxpayer;
                if (!req.query.ignore_user) return UserDao.findOne({ tin: req.params.tin });
            })
            .then((user) => {
                model.user = user;
                res.json({
                    success: true,
                    model
                })
            })
            .catch((errors) => {
                res.json({
                    success: false,
                    errors
                })
            });
    })

router.route('/details')
    .post((req, res) => {
        console.log('req.params.tin :', req.params.tin);
        var taxpayers = [];
        TaxpayerDao.findConnected(req.body)
            .then(results => {
                taxpayers = results;
                return UserDao.find({ tin: { $in: req.body } });
            })
            .then(users => {
                res.json({
                    success: true,
                    model: { taxpayers, users }
                })
            })
            .catch((errors) => {
                res.json({
                    success: false,
                    errors
                })
            });
    })


router
    .route('/users/:id')
    .get((req, res) => {
        TaxpayerDao.findByUserId(req.params.id)
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
    .route('/:id')
    .post((req, res) => {
        var data = req.body;
        if (req.headers.access_token && jwt.decode(req.headers.access_token) && jwt.decode(req.headers.access_token).account_id)
            data.modified_by = jwt.decode(req.headers.access_token).account_id;
        TaxpayerDao.modifyByID(req.params.id, data)
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