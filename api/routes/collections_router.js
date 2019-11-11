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
//COLLECTIONS MONTHLY ALL
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
//COLLECTIONS YEARLY ALL
    collections_router.route("/yearly")
    .get((req, res) => {
        console.log('YEARLY COLLECTIONS');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getCollectionByMonth(new Date().getFullYear())
            .then((results) => {
                console.log('results :', results);
                var byYear = []
                results.forEach(result => {
                    byYear[result.date_created.getFullYear()].collection += result.total_amount_payable
                    // console.log('result.total_amount_payable :', result.total_amount_payable.toString());
                });
                console.log('YEAR :', byYear);
                res.json({ byYear });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })

    collections_router.route('/insert/temp')
    .post((req, res) => {
        ReturnDetailsDao.createMany(req.body)
            .then((result) => {
                res.json({ result })
            }).catch((err) => {
                res.json({ err })
            });
    })

//COLLECTIONS BY MONTHLY PER RETURNS
collections_router.route("/monthly/returns")
    .get((req, res) => {
        console.log('MONTHLY RETURNS COUNT');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getCollectionByMonth(new Date().getFullYear())
            .then((results) => {
                console.log('results :', results);
                var byMonth = [{
                    month: 0,
                    count: 0,
                },
                {
                    month: 1,
                    count: 0,
                },
                {
                    month: 2,
                    count: 0,
                },
                {
                    month: 3,
                    count: 0,
                },
                {
                    month: 4,
                    count: 0,
                },
                {
                    month: 5,
                    count: 0,
                },
                {
                    month: 6,
                    count: 0,
                },
                {
                    month: 7,
                    count: 0,
                },
                {
                    month: 8,
                    count: 0,
                },
                {
                    month: 9,
                    count: 0,
                },
                {
                    month: 10,
                    count: 0,
                },
                {
                    month: 11,
                    count: 0,
                }
                ]
                results.forEach(result => {
                    byMonth[result.date_created.getMonth()].count += result.total_amount_payable
                    // console.log('result.total_amount_payable :', result.total_amount_payable.toString());
                });
                console.log('MONTH :', byMonth);
                res.json({ byMonth });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })
//COLLECTIONS BY MONTHLY PER TAXPAYER
collections_router.route("/monthly/taxpayers")
    .get((req, res) => {
        console.log('RDO COLLECTION');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getCollectionByRdo(req.params.code)
            .then((results) => {
                console.log('resultssssss :', results);

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
                // ACCUMULATED
                // var rdoCollection = results.reduce(function (accumulator, results) {
                //     return accumulator + results.total_amount_payable;
                // }, 0);
                res.json({ byMonth });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })
//COLLECTIONS BY MONTHLY PER RDO
collections_router.route("/monthly/rdo/:code")
    .get((req, res) => {
        console.log('RDO COLLECTION');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getCollectionByRdo(req.params.code)
            .then((results) => {
                console.log('resultssssss :', results);

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
                // ACCUMULATED
                // var rdoCollection = results.reduce(function (accumulator, results) {
                //     return accumulator + results.total_amount_payable;
                // }, 0);
                res.json({ byMonth });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })





module.exports = collections_router;