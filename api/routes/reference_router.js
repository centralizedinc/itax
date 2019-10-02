'use strict'

var request = require('request');
var express = require('express');
var path = require('path');
var ATCModel = require('../models/reference/atcModel')
var RDOModel = require('../models/reference/rdoModel')


var reference_router = express.Router();

reference_router.route("/")

    .get((req, res) => {
        
    })

reference_router.route("/atc")
    .get((req, res) => {
        ATCModel.find({ "form": req.query.form }, (err, results) => {
            if (!err) {
                res.json({
                    success: true,
                    atcs: results
                })
            }else{
                res.json({
                    success: false,
                    error_code:"0000",
                    error_msg: err
                });
            }
        });
    });

reference_router.route("/rdos")
    .get((req, res)=>{
        RDOModel.find({},(err, rdos)=>{
            res.json(rdos);
        })
    })
    
    .post((req, res)=>{
        var rdo = new RDOModel(req.body);
        rdo.save((err)=>{
            res.json(rdo);
        });
        
    });


module.exports = reference_router;