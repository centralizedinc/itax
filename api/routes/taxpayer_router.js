'use strict'

var request = require('request');
var express = require('express');
var path = require('path');

var TaxpayerModel = require('../models/taxpayerDetailsModel.js')

var taxpayer_router = express.Router();

taxpayer_router.route("/")

    .get((req, res)=>{        
        TaxpayerModel.findOne({"tin":req.query.tin},(err, resp)=>{

            if(!err){
                res.json({
                    success: true,
                    error_code:"0000",
                    data: resp
                });
            }else{
                res.json({
                    success: false,
                    error_code:"0000",
                    error_msg: err
                });
            }
            
        });
    })

    .post((req, res) => {
        var tp = new TaxpayerModel(req.body)
        tp.save((err)=>{
            res.json(tp);
        });
    })


module.exports = taxpayer_router;