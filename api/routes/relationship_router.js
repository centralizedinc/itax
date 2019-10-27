'use strict'

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// DAO
const RelationshipDao = require('../dao/RelationshipDao');
const TaxpayerDao = require('../dao/TaxpayerDao')

// Utils
const SendEmail = require('../utils/email');

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
        RelationshipDao.findOne({ from: data.from, to: data.to, status: 'A' })
            .then((result) => {
                if (!result) return RelationshipDao.create(data)
                else return Promise.resolve({ message: 'Connection is already exist' })
            })
            .then((model) => {
                console.log('model :', model);
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

router.route('/remove')
    .post((req, res) => {
        var data = req.body;
        data.modified_by = jwt.decode(req.headers.access_token).account_id;
        RelationshipDao.remove(data)
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

router.route('/:tin')
    .get((req, res) => {
        RelationshipDao.find({ from: req.params.tin, status: 'A' })
            .then(model => {
                res.json({
                    success: true,
                    model
                })
            })
            .catch(errors => {
                res.json({
                    success: true,
                    errors
                })
            })
    })

router.route('/connect/all')
    .post((req, res) => {
        const created_by = jwt.decode(req.headers.access_token).account_id;
        RelationshipDao.createMany(req.body, created_by)
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

router.route('/connect/all/new')
    .post((req, res) => {
        var model = {}
        const created_by = jwt.decode(req.headers.access_token).account_id;
        const { taxpayers, invitations, connections } = req.body;
        TaxpayerDao.createMany(taxpayers, created_by)
            .then((results) => {
                model.taxpayers = results;
                return RelationshipDao.createMany(connections, created_by);
            })
            .then((results) => {
                model.connections = results;
                return SendEmail.sendMultipleInvitation(invitations);
            })
            .then((results) => {
                model.emails = results;
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