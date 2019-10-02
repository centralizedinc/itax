'use strict'

var request = require('request');
var express = require('express');
var path = require('path');

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

module.exports = user_router;