const router = require("express").Router();

// Dao
const TaxpayerDao = require('../dao/TaxpayerDao');
const ReturnDetailsDao = require('../dao/ReturnDetailsDao');
const RdoDao = require('../dao/RdoDao');

// Taxpayers
router.route('/taxpayers')
    .get((req, res) => {
        // By default search by Year or Current Year
        var currentYr = parseInt(req.query.year || new Date().getFullYear()),
            conditions = {
                date_created: {
                    $gte: new Date(currentYr, 0, 1),
                    $lte: new Date(currentYr, 12, 0)
                }
            };
        console.log('current year :', currentYr);

        // If month is not null, search also by month or current month
        if (req.query.month) {
            var currentMonth = parseInt(req.query.month || new Date().getMonth()),
                conditions = {
                    date_created: {
                        $gte: new Date(currentYr, currentMonth, 1),
                        $lte: new Date(currentYr, currentMonth + 1, 0)
                    }
                }
            console.log('current month :', currentMonth);
        }

        // If rdo is not null, search also by rdo. But if rdo is null, ignore rdo
        if (req.query.rdo) conditions.rdo_code = req.query.rdo
        console.log('rdo :', req.query.rdo)

        console.log('conditions :', conditions);
        TaxpayerDao.getCountsByConditions(conditions).then(result => {
            res.json(result)
        }).catch(errors => {
            res.json({ errors });
        })
    })

router.route('/taxpayers/yearly')
    .get((req, res) => {
        var years = 10, conditions = {
            date_created: {
                $gte: new Date(new Date().getFullYear() - years, 0, 1),
                $lt: new Date()
            }
        }
        if(req.query.rdo) conditions.rdo_code = req.query.rdo;
        TaxpayerDao.getTaxpayersAnalytics(conditions, 'date_created')
            .then((result) => {
                var results = [];
                for (let i = 0; i < years; i++) {
                    var year = new Date().getFullYear() - i,
                        counts = result && result.length ? result.filter(v => new Date(v.date_created).getFullYear() === year).length : 0
                    results.push({ year, counts })
                }
                res.json(results);
            }).catch((errors) => {
                console.log('errors :', errors);
                res.json({ errors });
            });
    })

router.route('/taxpayers/monthly/:year')
    .get((req, res) => {
        var months = 12, conditions = {
            date_created: {
                $gte: new Date(req.params.year || new Date().getFullYear(), 0, 1),
                $lt: new Date(req.params.year || new Date().getFullYear(), 12, 0)
            }
        }
        if(req.query.rdo) conditions.rdo_code = req.query.rdo;
        TaxpayerDao.getTaxpayersAnalytics(conditions, 'date_created')
            .then((result) => {
                var results = [];
                for (let month = 0; month < months; month++) {
                    var counts = result && result.length ? result.filter(v => new Date(v.date_created).getMonth() === month).length : 0
                    results.push({ month, counts })
                }
                res.json(results);
            }).catch((errors) => {
                console.log('errors :', errors);
                res.json({ errors });
            });
    })

router.route('/taxpayers/collections')
    .get((req, res) => {
        var taxpayers = [];
        TaxpayerDao.findAll()
            .then((tps) => {
                taxpayers = tps;
                const tins = taxpayers.map(v => v.tin);
                const conditions = {
                    date_created: {
                        $gte: new Date(new Date().getFullYear(), 0, 1),
                        $lt: new Date(new Date().getFullYear(), 12, 0)
                    },
                    tin: { $in: tins }
                }
                return ReturnDetailsDao.getCollectionsByConditions(conditions);
            })
            .then((returns) => {
                taxpayers.forEach(tp => {
                    var filtered_returns = returns && returns.length ? returns.filter(v => v.tin === tp.tin) : null;
                    var collections = 0;
                    if (filtered_returns && filtered_returns.length) collections = filtered_returns.map(v => v.total_amount_payable).reduce((t, c) => t + c);
                    tp.collections = collections;
                })
                res.json(taxpayers);
            })
            .catch((errors) => {
                console.log('err :', errors);
                res.json({ errors })
            });
    })

// Collections
router.route('/collections')
    .get((req, res) => {
        // By default search by Year or Current Year
        var currentYr = parseInt(req.query.year || new Date().getFullYear()),
            conditions = {
                date_created: {
                    $gte: new Date(currentYr, 0, 1),
                    $lte: new Date(currentYr, 12, 0)
                }
            };
        console.log('current year :', currentYr);

        // If month is not null, search also by month or current month
        if (req.query.month) {
            var currentMonth = parseInt(req.query.month || new Date().getMonth()),
                conditions = {
                    date_created: {
                        $gte: new Date(currentYr, currentMonth, 1),
                        $lte: new Date(currentYr, currentMonth + 1, 0)
                    }
                }
            console.log('current month :', currentMonth);
        }

        // If rdo is not null, search also by rdo. But if rdo is null, ignore rdo
        if (req.query.rdo) conditions.rdo_code = req.query.rdo
        console.log('rdo :', req.query.rdo)

        console.log('conditions :', conditions);
        ReturnDetailsDao.getCollectionsByConditions(conditions, 'total_amount_payable')
            .then(results => {
                if (!results || !results.length) res.json(0);
                else {
                    var sum = results.map(v => v.total_amount_payable).reduce((t, c) => t + c);
                    res.json(sum);
                }
            }).catch(errors => {
                res.json({ errors });
            })
    })

router.route('/collections/yearly')
    .get((req, res) => {
        var years = 10, conditions = {
            payment_status: 'paid',
            date_created: {
                $gte: new Date(new Date().getFullYear() - years, 0, 1),
                $lt: new Date()
            }
        }
        if(req.query.rdo) conditions.rdo_code = req.query.rdo;
        ReturnDetailsDao.getReturnsAnalytics(conditions, 'date_created total_amount_payable')
            .then((result) => {
                var results = [];
                for (let i = 0; i < years; i++) {
                    var year = new Date().getFullYear() - i,
                        filtered_result = result && result.length ? result.filter(v => new Date(v.date_created).getFullYear() === year) : null,
                        collections = filtered_result && filtered_result.length ? filtered_result.map(v => v.total_amount_payable).reduce((t, c) => t + c) : 0;
                    results.push({ year, collections })
                }
                res.json(results);
            }).catch((errors) => {
                console.log('errors :', errors);
                res.json({ errors });
            });
    })

router.route('/collections/monthly/:year')
    .get((req, res) => {
        var months = 12, conditions = {
            payment_status: 'paid',
            date_created: {
                $gte: new Date(req.params.year || new Date().getFullYear(), 0, 1),
                $lt: new Date(req.params.year || new Date().getFullYear(), 12, 0)
            }
        }
        if(req.query.rdo) conditions.rdo_code = req.query.rdo;
        ReturnDetailsDao.getReturnsAnalytics(conditions, 'date_created total_amount_payable')
            .then((result) => {
                var results = [];
                for (let month = 0; month < months; month++) {
                    var filtered_result = result && result.length ? result.filter(v => new Date(v.date_created).getMonth() === month) : null,
                        collections = filtered_result && filtered_result.length ? filtered_result.map(v => v.total_amount_payable).reduce((t, c) => t + c) : 0;
                    results.push({ month, collections })
                }
                res.json(results);
            }).catch((errors) => {
                console.log('errors :', errors);
                res.json({ errors });
            });
    })

router.route('/collections/taxtype')
    .get((req, res) => {
        var results = [{ tax_type: 'IT' }, { tax_type: 'VT' }, { tax_type: 'WT' }, { tax_type: 'PT' }, { tax_type: 'DST' }, { tax_type: 'OT' }];
        ReturnDetailsDao.getCollectionsByConditions({
            date_created: {
                $gte: new Date(new Date().getFullYear(), 0, 1),
                $lt: new Date(new Date().getFullYear(), 12, 0)
            }
        }, 'total_amount_payable tax_type date_created')
            .then((returns) => {
                results.forEach(result => {
                    var filtered_returns = returns && returns.length ? returns.filter(v => v.tax_type === result.tax_type) : null;
                    var collections = 0;
                    if (filtered_returns && filtered_returns.length) collections = filtered_returns.map(v => v.total_amount_payable).reduce((t, c) => t + c);
                    result.collections = collections;
                })
                res.json(results)
            }).catch((errors) => {
                console.log('errors :', errors);
                res.json({ errors })
            });
    })

router.route('/collections/rdo')
    .get((req, res) => {
        var results = []
        RdoDao.findAll()
            .then((rdos) => {
                results = rdos;
                return ReturnDetailsDao.getCollectionsByConditions({
                    date_created: {
                        $gte: new Date(new Date().getFullYear(), 0, 1),
                        $lt: new Date(new Date().getFullYear(), 12, 0)
                    }
                }, 'rdo_code total_amount_payable date_created')
            })
            .then((returns) => {
                results.forEach(result => {
                    var filtered_returns = returns && returns.length ? returns.filter(v => v.rdo_code === result.rdo_code) : null;
                    var collections = 0;
                    if (filtered_returns && filtered_returns.length) collections = filtered_returns.map(v => v.total_amount_payable).reduce((t, c) => t + c);
                    result.collections = collections;
                })
                res.json(results)
            })
            .catch((errors) => {
                console.log('errors :', errors);
                res.json({ errors })
            });
    })

// Returns
router.route('/returns')
    .get((req, res) => {
        // By default search by Year or Current Year
        var currentYr = parseInt(req.query.year || new Date().getFullYear()),
            conditions = {
                date_created: {
                    $gte: new Date(currentYr, 0, 1),
                    $lte: new Date(currentYr, 12, 0)
                }
            };
        console.log('current year :', currentYr);

        // If month is not null, search also by month or current month
        if (req.query.month) {
            var currentMonth = parseInt(req.query.month || new Date().getMonth()),
                conditions = {
                    date_created: {
                        $gte: new Date(currentYr, currentMonth, 1),
                        $lte: new Date(currentYr, currentMonth + 1, 0)
                    }
                }
            console.log('current month :', currentMonth);
        }

        // If rdo is not null, search also by rdo. But if rdo is null, ignore rdo
        if (req.query.rdo) conditions.rdo_code = req.query.rdo
        console.log('rdo :', req.query.rdo)

        console.log('conditions :', conditions);
        ReturnDetailsDao.getCountsByConditions(conditions).then(result => {
            res.json(result)
        }).catch(errors => {
            res.json({ errors });
        })
    })

router.route('/returns/yearly')
    .get((req, res) => {
        var years = 10, conditions = {
            date_created: {
                $gte: new Date(new Date().getFullYear() - years, 0, 1),
                $lt: new Date()
            }
        }
        if(req.query.rdo) conditions.rdo_code = req.query.rdo;
        ReturnDetailsDao.getReturnsAnalytics(conditions, 'date_created')
            .then((result) => {
                var results = [];
                for (let i = 0; i < years; i++) {
                    var year = new Date().getFullYear() - i,
                        counts = result && result.length ? result.filter(v => new Date(v.date_created).getFullYear() === year).length : 0
                    results.push({ year, counts })
                }
                res.json(results);
            }).catch((errors) => {
                console.log('errors :', errors);
                res.json({ errors });
            });
    })

router.route('/returns/monthly/:year')
    .get((req, res) => {
        var months = 12, conditions = {
            date_created: {
                $gte: new Date(req.params.year || new Date().getFullYear(), 0, 1),
                $lt: new Date(req.params.year || new Date().getFullYear(), 12, 0)
            }
        }
        if(req.query.rdo) conditions.rdo_code = req.query.rdo;
        ReturnDetailsDao.getReturnsAnalytics(conditions, 'date_created')
            .then((result) => {
                var results = [];
                for (let month = 0; month < months; month++) {
                    var counts = result && result.length ? result.filter(v => new Date(v.date_created).getMonth() === month).length : 0
                    results.push({ month, counts })
                }
                res.json(results);
            }).catch((errors) => {
                console.log('errors :', errors);
                res.json({ errors });
            });
    })

module.exports = router;