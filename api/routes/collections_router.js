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
collections_router.route("/yearly")
.get((req, res) => {
    console.log('TOTAL COLLECTIONS');
    // ReturnDetailsDao.findAll(req.query.total_amount_payable)
    ReturnDetailsDao.getCollection(new Date().getFullYear())
        .then((results) => {
            console.log('results :', results);
            //2019
            var year2019 = results.filter(function (result) {
                return result.date_created.getFullYear() === 2019;
            }).map(function (collections) {
                return collections.total_amount_payable;
            }).reduce(function (acc, collection) {
                return acc + parseFloat(collection);
            }, 0);
            //2018
            var year2018 = results.filter(function (result) {
                return result.date_created.getFullYear() === 2018;
            }).map(function (collections) {
                return collections.total_amount_payable;
            }).reduce(function (acc, collection) {
                return acc + parseFloat(collection);
            }, 0);
            //2017
            var year2017 = results.filter(function (result) {
                return result.date_created.getFullYear() === 2017;
            }).map(function (collections) {
                return collections.total_amount_payable;
            }).reduce(function (acc, collection) {
                return acc + parseFloat(collection);
            }, 0);
            //2016
            var year2016 = results.filter(function (result) {
                return result.date_created.getFullYear() === 2016;
            }).map(function (collections) {
                return collections.total_amount_payable;
            }).reduce(function (acc, collection) {
                return acc + parseFloat(collection);
            }, 0);
            //2015
            var year2015 = results.filter(function (result) {
                return result.date_created.getFullYear() === 2015;
            }).map(function (collections) {
                return collections.total_amount_payable;
            }).reduce(function (acc, collection) {
                return acc + parseFloat(collection);
            }, 0);
            //2014
            var year2014 = results.filter(function (result) {
                return result.date_created.getFullYear() === 2014;
            }).map(function (collections) {
                return collections.total_amount_payable;
            }).reduce(function (acc, collection) {
                return acc + parseFloat(collection);
            }, 0);
            //2013
            var year2013 = results.filter(function (result) {
                return result.date_created.getFullYear() === 2013;
            }).map(function (collections) {
                return collections.total_amount_payable;
            }).reduce(function (acc, collection) {
                return acc + parseFloat(collection);
            }, 0);
            //2012
            var year2012 = results.filter(function (result) {
                return result.date_created.getFullYear() === 2012;
            }).map(function (collections) {
                return collections.total_amount_payable;
            }).reduce(function (acc, collection) {
                return acc + parseFloat(collection);
            }, 0);
            //2011
            var year2011 = results.filter(function (result) {
                return result.date_created.getFullYear() === 2011;
            }).map(function (collections) {
                return collections.total_amount_payable;
            }).reduce(function (acc, collection) {
                return acc + parseFloat(collection);
            }, 0);  
            //2010
            var year2010 = results.filter(function (result) {
                return result.date_created.getFullYear() === 2010;
            }).map(function (collections) {
                return collections.total_amount_payable;
            }).reduce(function (acc, collection) {
                return acc + parseFloat(collection);
            }, 0);

            // res.json([results])
            res.json([
                {
                    "year": 2019,
                    "collection": year2019
                },
                {
                    "year": 2018,
                    "collection": year2018

                },
                {
                    "year": 2017,
                    "collection": year2017
                },
                {
                    "year": 2016,
                    "collection": year2016
                },
                {
                    "year": 2015,
                    "collection": year2015
                },
                {
                    "year": 2014,
                    "collection": year2014
                },
                {
                    "year": 2013,
                    "collection": year2013
                },
                {
                    "year": 2012,
                    "collection": year2012
                },
                {
                    "year": 2011,
                    "collection": year2011
                },
                {
                    "year": 2010,
                    "collection": year2010
                }
            ]);


        })
        .catch((errors) => {
            res.json({ errors });
        });
})
collections_router.route("/yearly/returns")
    .get((req, res) => {
        console.log('TOTAL COLLECTIONS');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.countReturns(new Date().getFullYear())
            .then((results) => {
                console.log('results :', results);
                //2019
                var count2019 = results.filter(function (result) {
                    return result.date_created.getFullYear() === 2019;
                }).map(function (collections) {
                    return collections.total_amount_payable;
                }).reduce(function (acc, collection) {
                    return acc + 1;
                }, 0);
                //2018
                var count2018 = results.filter(function (result) {
                    return result.date_created.getFullYear() === 2018;
                }).map(function (collections) {
                    return collections.total_amount_payable;
                }).reduce(function (acc, collection) {
                    return acc + 1;
                }, 0);
                //2017
                var count2017 = results.filter(function (result) {
                    return result.date_created.getFullYear() === 2017;
                }).map(function (collections) {
                    return collections.total_amount_payable;
                }).reduce(function (acc, collection) {
                    return acc + 1;
                }, 0);
                //2016
                var count2016 = results.filter(function (result) {
                    return result.date_created.getFullYear() === 2016;
                }).map(function (collections) {
                    return collections.total_amount_payable;
                }).reduce(function (acc, collection) {
                    return acc + 1;
                }, 0);
                //2015
                var count2015 = results.filter(function (result) {
                    return result.date_created.getFullYear() === 2015;
                }).map(function (collections) {
                    return collections.total_amount_payable;
                }).reduce(function (acc, collection) {
                    return acc + 1;
                }, 0);
                //2014
                var count2014 = results.filter(function (result) {
                    return result.date_created.getFullYear() === 2014;
                }).map(function (collections) {
                    return collections.total_amount_payable;
                }).reduce(function (acc, collection) {
                    return acc + 1;
                }, 0);
                //2013
                var count2013 = results.filter(function (result) {
                    return result.date_created.getFullYear() === 2013;
                }).map(function (collections) {
                    return collections.total_amount_payable;
                }).reduce(function (acc, collection) {
                    return acc + 1;
                }, 0);
                //2012
                var count2012 = results.filter(function (result) {
                    return result.date_created.getFullYear() === 2012;
                }).map(function (collections) {
                    return collections.total_amount_payable;
                }).reduce(function (acc, collection) {
                    return acc + 1;
                }, 0);
                //2011
                var count2011 = results.filter(function (result) {
                    return result.date_created.getFullYear() === 2011;
                }).map(function (collections) {
                    return collections.total_amount_payable;
                }).reduce(function (acc, collection) {
                    return acc + 1;
                }, 0);
                //2010
                var count2010 = results.filter(function (result) {
                    return result.date_created.getFullYear() === 2010;
                }).map(function (collections) {
                    return collections.total_amount_payable;
                }).reduce(function (acc, collection) {
                    return acc + 1;
                }, 0);

                // res.json([results])
                res.json([
                    {
                        "year": 2019,
                        "returns": count2019
                    },
                    {
                        "year": 2018,
                        "returns": count2018

                    },
                    {
                        "year": 2017,
                        "returns": count2017
                    },
                    {
                        "year": 2016,
                        "returns": count2016
                    },
                    {
                        "year": 2015,
                        "returns": count2015
                    },
                    {
                        "year": 2014,
                        "returns": count2014
                    },
                    {
                        "year": 2013,
                        "returns": count2013
                    },
                    {
                        "year": 2012,
                        "returns": count2012
                    },
                    {
                        "year": 2011,
                        "returns": count2011
                    },
                    {
                        "year": 2010,
                        "returns": count2010
                    }
                ]);


            })
            .catch((errors) => {
                res.json({ errors });
            });
    })
//COLLECTIONS YEARLY ALL
collections_router.route("/yearly/:year")
    .get((req, res) => {
        console.log('YEARLY COLLECTIONS');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getRdoCollectionByYear(req.params.year)
            .then((results) => {
                console.log('results :', results);

                var collection_Year = results.reduce(function (accumulator, result) {
                    return accumulator + parseFloat(result.total_amount_payable);
                }, 0);
                var return_year = results.reduce(function (accumulator, result) {
                    return accumulator + 1;
                }, 0);
                // byYear[result.date_created.getFullYear()].collection += result.total_amount_payable
                // console.log('result.total_amount_payable :', result.total_amount_payable.toString());
                res.json({ collection_Year, return_year });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })
//COLLECTIONS MONTHLY ALL PER YEAR
collections_router.route("/monthly/:year")
    .get((req, res) => {
        console.log('MONTHLY COLLECTIONS');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getCollectionByMonth(req.params.year)
            .then((results) => {
                console.log('results :', results);
                var byMonth = [
                    {
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
                    byMonth[result.date_created.getMonth()].collection += parseFloat(result.total_amount_payable)
                    // console.log('result.total_amount_payable :', result.total_amount_payable.toString());
                });
                console.log('MONTH :', byMonth);
                res.json({ byMonth });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })
//COLLECTIONS || RETURNS BY MONTHLY PER YEAR ALL PAID || UNPAID
collections_router.route("/monthly/returns/:year")
.get((req, res) => {
    console.log('RETURN COLLECTION');
    // ReturnDetailsDao.findAll(req.query.total_amount_payable)
    ReturnDetailsDao.getCollectionByMonth(req.params.year)
        .then((results) => {
            console.log('resultssssss :', results);
            var byMonth = [
                {
                    month: 0,
                    collection: 0,
                    count: 0
                },
                {
                    month: 1,
                    collection: 0,
                    count: 0
                },
                {
                    month: 2,
                    collection: 0,
                    count: 0
                },
                {
                    month: 3,
                    collection: 0,
                    count: 0
                },
                {
                    month: 4,
                    collection: 0,
                    count: 0
                },
                {
                    month: 5,
                    collection: 0,
                    count: 0
                },
                {
                    month: 6,
                    collection: 0,
                    count: 0
                },
                {
                    month: 7,
                    collection: 0,
                    count: 0
                },
                {
                    month: 8,
                    collection: 0,
                    count: 0
                },
                {
                    month: 9,
                    collection: 0,
                    count: 0
                },
                {
                    month: 10,
                    collection: 0,
                    count: 0
                },
                {
                    month: 11,
                    collection: 0,
                    count: 0
                }
            ]
            results.forEach(result => {
                byMonth[result.date_created.getMonth()].collection += parseFloat(result.total_amount_payable);
                byMonth[result.date_created.getMonth()].count += 1;
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

                var byMonth = [
                    {
                        month: 0,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 1,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 2,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 3,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 4,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 5,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 6,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 7,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 8,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 9,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 10,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 11,
                        collection: 0,
                        count: 0
                    }
                ]
                results.forEach(result => {
                    byMonth[result.date_created.getMonth()].collection += parseFloat(result.total_amount_payable);
                    byMonth[result.date_created.getMonth()].count += 1;
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
//COLLECTIONS BY MONTHLY PER RDO PER YEAR
collections_router.route("/monthly/rdo/:year")
    .get((req, res) => {
        console.log('RDO COLLECTION');
        // ReturnDetailsDao.findAll(req.query.total_amount_payable)
        ReturnDetailsDao.getCollectionByRdo(req.params.code)
            .then((results) => {
                console.log('resultssssss :', results);

                var rdo = [
                    {
                        month: 0,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 1,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 2,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 3,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 4,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 5,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 6,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 7,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 8,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 9,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 10,
                        collection: 0,
                        count: 0
                    },
                    {
                        month: 11,
                        collection: 0,
                        count: 0
                    }
                ]
                results.forEach(result => {
                    byMonth[result.date_created.getMonth()].collection += parseFloat(result.total_amount_payable);
                    byMonth[result.date_created.getMonth()].count += 1;
                    // console.log('result.total_amount_payable :', result.total_amount_payable.toString());
                });
                res.json({ byMonth });
            })
            .catch((errors) => {
                res.json({ errors });
            });
    })
//COLLECTIONS || RETURNS BY MONTHLY PER YEAR PAID
collections_router.route("/monthly/returns/:year")
.get((req, res) => {
    console.log('RETURN COLLECTION');
    // ReturnDetailsDao.findAll(req.query.total_amount_payable)
    ReturnDetailsDao.getCollectionByMonthPaid(req.params.year)
        .then((results) => {
            console.log('resultssssss :', results);
            var byMonth = [
                {
                    month: 0,
                    collection: 0,
                    count: 0
                },
                {
                    month: 1,
                    collection: 0,
                    count: 0
                },
                {
                    month: 2,
                    collection: 0,
                    count: 0
                },
                {
                    month: 3,
                    collection: 0,
                    count: 0
                },
                {
                    month: 4,
                    collection: 0,
                    count: 0
                },
                {
                    month: 5,
                    collection: 0,
                    count: 0
                },
                {
                    month: 6,
                    collection: 0,
                    count: 0
                },
                {
                    month: 7,
                    collection: 0,
                    count: 0
                },
                {
                    month: 8,
                    collection: 0,
                    count: 0
                },
                {
                    month: 9,
                    collection: 0,
                    count: 0
                },
                {
                    month: 10,
                    collection: 0,
                    count: 0
                },
                {
                    month: 11,
                    collection: 0,
                    count: 0
                }
            ]
            results.forEach(result => {
                byMonth[result.date_created.getMonth()].collection += parseFloat(result.total_amount_payable);
                byMonth[result.date_created.getMonth()].count += 1;
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