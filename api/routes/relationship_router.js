'use strict'

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const RelationshipDao = require('../dao/RelationshipDao');

router.route("/")
    .get((req, res) => {
        RelationshipDao.findAll()
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
        RelationshipDao.create(data)
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