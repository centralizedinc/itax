'use strict'

var express = require('express');
const jwt = require('jsonwebtoken');

var user_router = express.Router();

const UserDao = require('../dao/UserDao');

user_router.route("/")
    .get((req, res) => {
        UserDao.findAll()
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
        UserDao.create(req.body)
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
    });

user_router.route("/accountid")
    .get((req, res) => {
        const account_id = jwt.decode(req.headers.access_token).account_id;
        UserDao.findOneByAccountID(account_id)
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
        const account_id = jwt.decode(req.headers.access_token).account_id;
        console.log('account_id :', account_id);
        UserDao.modifyByAccountID(account_id, req.body)
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
    });


user_router.route("/:id")
    .get((req, res) => {
        UserDao.findOneByID(req.params.id)
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
        UserDao.modifyByID(req.params.id, req.body)
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
    });

module.exports = user_router;