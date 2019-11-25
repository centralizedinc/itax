const router = require("express").Router();

// Dao
const TaxpayerDao = require('../dao/TaxpayerDao');
const ReturnDetailsDao = require('../dao/ReturnDetailsDao');

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

router.route('/collections')
    .get((req, res) => {
        // By default search by Year or Current Year
        var currentYr = parseInt(req.query.year || new Date().getFullYear()),
            conditions = {
                payment_status: 'paid',
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
                    payment_status: 'paid',
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
        ReturnDetailsDao.selectByConditions(conditions, 'total_amount_payable')
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

module.exports = router;