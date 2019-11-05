'use strict'

var request = require('request');
var express = require('express');
var path = require('path');
const jwt = require('jsonwebtoken');

const RdoDao = require('../dao/RdoDao')
const ReturnDetailsDao = require('../dao/ReturnDetailsDao');
const PaymentDao = require('../dao/PaymentDao');
const TaxpayerDao = require('../dao/TaxpayerDao')
// const UserDao = require('../dao/UserDao');

var collections_router = express.Router();

collections_router.route("/")
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
collections_router.route("/taxpayers/counts")
    .get((req, res) => {
        console.log("Taxpayer :", req.query);
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
collections_router.route("/taxpayers/returns")
    .get((req, res) => {
        ReturnDetailsDao.findAll()
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

collections_router.route("/taxpayers/returns/collections")
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
// collections_router.route("/rdo")
// .get((req, res) => {
//     RdoDao.findAll()
//         .then((model) => {
//             res.json({
//                 success: true,
//                 model
//             })
//         }).catch((errors) => {
//             res.json({
//                 success: false,
//                 errors
//             })
//         });
// })

// collections_router.route("/collections")
// .get((req, res) => {
//     PaymentDao.findAll()
//         .then((model) => {
//             res.json({
//                 success: true,
//                 model
//             })
//         }).catch((errors) => {
//             res.json({
//                 success: false,
//                 errors
//             })
//         });
// })

// collections_router.route("/taxpayers/counts")
//     .get((req, res) => {
//         TaxpayerDao.findAll()
//             .then((model) => {
//                 res.json({
//                     success: true,
//                     model
//                 })
//             }).catch((errors) => {
//                 res.json({
//                     success: false,
//                     errors
//                 })
//             });
//     })

//     collections_router.route("/taxpayer/:taxtype")
//     .get((req, res) => {
//         TaxpayerDao.findAll()
//             .then((model) => {
//                 res.json({
//                     success: true,
//                     model
//                 })
//             }).catch((errors) => {
//                 res.json({
//                     success: false,
//                     errors
//                 })
//             });
//     })

//     collections_router.route("/rdo/:code'")
//     .get((req, res) => {
//         RdoDao.findByRdoCode(req.params.code)
//             .then((model) => {
//                 res.json({
//                     success: true,
//                     model
//                 })
//             }).catch((errors) => {
//                 res.json({
//                     success: false,
//                     errors
//                 })
//             });
//     })

// collections_router.route("/collections/returns/counts")
//     .get((req, res) => {
//         PaymentDao.findAll()
//             .then((model) => {
//                 res.json({
//                     success: true,
//                     model
//                 })
//             }).catch((errors) => {
//                 res.json({
//                     success: false,
//                     errors
//                 })
//             });
//     })


module.exports = collections_router;