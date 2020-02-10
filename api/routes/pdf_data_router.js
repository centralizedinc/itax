'use strict'

var express = require('express');

const model = require('../models/PdfDataModel');

const jwt = require('jsonwebtoken');


var router = express.Router();

// function getValue(obj, keyword) {
//     var keywords = keyword.split('.'), value = obj;
//     keywords.forEach(element => {
//         value = value[element];
//     });
//     return value
// }

router.route("/")
    .get((req, res) => {
        model.find({ status: "A" })
            .then((result) => {
                res.json(result)
            }).catch((error) => {
                res.json({ error })
            });
    })
    .post((req, res) => {
        var created_by = "", data = req.body;
        if (req.headers.access_token && jwt.decode(req.headers.access_token) && jwt.decode(req.headers.access_token).account_id) {
            created_by = jwt.decode(req.headers.access_token).account_id
            data.created_by = created_by;
        };
        model.find({ status: "A" })
            .then(results => {
                if(results) {
                    var codes = results.map(v => v.code);
                    if(!codes.includes(data.code)) {
                        return (new model(data)).save()
                    } else {
                        return { error: { code: 'code_err', message: "Code already exists." } }
                    }
                } else {
                    return (new model(data)).save()
                }
            })
            .then((result) => {
                res.json(result)
            }).catch((error) => {
                res.json({ error })
            });
    })

router.route("/code/:code")
    .get((req, res) => {
        model.findOne({ status: "A", code: req.params.code })
            .then((results) => {
                res.json(results)
            }).catch((error) => {
                res.json({ error })
            });
    })

router.route("/remove/:code")
    .get((req, res) => {
        model.findOneAndUpdate({ code: req.params.code }, { status: "I" })
            .then((results) => {
                res.json(results)
            }).catch((error) => {
                res.json({ error })
            });
    })

router.route("/:id")
    .get((req, res) => {
        model.findById(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((error) => {
                res.json({ error })
            });
    })
    .post((req, res) => {
        var modified_by = "", data = req.body;
        if (req.headers.access_token && jwt.decode(req.headers.access_token) && jwt.decode(req.headers.access_token).account_id) {
            modified_by = jwt.decode(req.headers.access_token).account_id
            data.modified_by = modified_by;
        };        
        model.find({ status: "A" })
            .then(results => {
                if(results) {
                    var codes = results.map(v => v.code);
                    if(!codes.includes(data.code)) {
                        return model.findByIdAndUpdate(req.params.id, data)
                    } else {
                        return { error: { code: 'code_err', message: "Code already exists." } }
                    }
                } else {
                    return model.findByIdAndUpdate(req.params.id, data)
                }
            })
            .then((result) => {
                res.json(result)
            }).catch((error) => {
                res.json({ error })
            });
    })

module.exports = router;