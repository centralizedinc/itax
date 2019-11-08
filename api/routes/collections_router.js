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


//COLLECTIONS
collections_router.route("/")
    .get((req, res) => {
        console.log('TOTAL COLLECTIONS');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getCollection(new Date().getFullYear())
            .then((results) => {
                res.json({ results });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })
//COLLECTIONS MONTHLY
collections_router.route("/monthly")
    .get((req, res) => {
        console.log('MONTHLY COLLECTIONS');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getCollectionByMonth(new Date().getFullYear())
            .then((results) => {
                console.log('results :', results);
                var byMonth = [{
                    month: 0,
                    collection: 0,
                },
                {
                    month: 1,
                    collection: 0,
                },
                {
                    month: 2,
                    collection: 0,
                },
                {
                    month: 3,
                    collection: 0,
                },
                {
                    month: 4,
                    collection: 0,
                },
                {
                    month: 5,
                    collection: 0,
                },
                {
                    month: 6,
                    collection: 0,
                },
                {
                    month: 7,
                    collection: 0,
                },
                {
                    month: 8,
                    collection: 0,
                },
                {
                    month: 9,
                    collection: 0,
                },
                {
                    month: 10,
                    collection: 0,
                },
                {
                    month: 11,
                    collection: 0,
                }
                ]
                results.forEach(result => {

                    byMonth[result.date_created.getMonth()].collection += result.total_amount_payable

                    // console.log('result.total_amount_payable :', result.total_amount_payable.toString());
                });
                console.log('MONTH :', byMonth);
                res.json({ byMonth });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })
//COLLECTIONS YEARLY
collections_router.route("/yearly")
    .get((req, res) => {
        console.log('YEARLY COLLECTIONS');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getCollectionByRdo(new Date().getFullYear())
            .then((results) => {
                console.log('results :', results);
                var byYear = [
                    {
                        rdo_code: "001",
                        year: new Date,
                        collection: 0
                    },
                    {
                        rdo_code: "002",
                        year: new Date,
                        collection: 0
                    },
                    {
                        rdo_code: "003",
                        year: new Date,
                        collection: 0
                    },
                    {
                        rdo_code: "004",
                        year: new Date,
                        collection: 0
                    },

                ]

                results.forEach(result => {
                    byYear[result.rdo_code[0]].collection += result.total_amount_payable
                });
                res.json({ byYear });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })

//NUMBER OF TAXPAYER
collections_router.route("/taxpayer")
    .get((req, res) => {
        console.log('NUMBER OF TAXPAYER');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getCountOfTaxpayer(req.query.results)
            .then((results) => {
                res.json({ results });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })
//NUMBER OF RETURNS
collections_router.route("/returns")
    .get((req, res) => {
        console.log('NUMBER OF RETURNS');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getCountOfReturns(new Date().getFullYear())
            .then((results) => {
                console.log('results :', results);
                var rdoCollection = [
                    {
                        rdo_code: "001",
                        collection: 0
                    },
                    {
                        rdo_code: "002",
                        collection: 0
                    },


                ]
                results.forEach(result => {

                    rdoCollection[result.rdo_code].collection += result_amount_payable

                });
                res.json({ rdoCollection });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })
//COLLECTIONS BY RDO
collections_router.route("/rdo/:code")
    .get((req, res) => {
        console.log('RDO COLLECTION');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getCollectionByRdo(new Date().getFullYear())
            .then((results) => {
                console.log('results :', results);
                var rdoCollection = [


                ]
                results.forEach(result => {
                    // console.log('result :', result);
                    rdoCollection[result.rdo_code].collection += result.total_amount_payable

                });
                res.json({ rdoCollection });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })
// collections_router.route("/taxpayers/counts")
//     .get((req, res) => {
//         console.log("Taxpayer :", req.query);
//         ReturnDetailsDao.findAll()
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
//     collections_router.route("/taxpayers/returns")
//     .get((req, res) => {
//         ReturnDetailsDao.findAll()
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

//     collections_router.route("/taxpayers/returns/collections")
//     .get((req, res) => {
//         ReturnDetailsDao.findAll()
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

collections_router.route('/insert/temp')
    .post((req, res) => {
        ReturnDetailsDao.createMany(req.body)
            .then((result) => {
                res.json({ result })
            }).catch((err) => {
                res.json({ err })
            });
    })

module.exports = collections_router;