"use strict";

const router = require("express").Router();
const passport = require('passport');

// Dao
const AccountDao = require('../dao/AccountDao');

// Utils
const constant_helper = require('../utils/constant_helper');

router.route('/')
    .get((req, res) => {
        AccountDao.findAll()
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
        AccountDao.create(req.body)
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