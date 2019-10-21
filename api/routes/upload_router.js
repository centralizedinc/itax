var router = require("express").Router();

var Uploader = require('../utils/uploader')
var model = require('../models/FormModel')


router.route('/')
    .post((req, res) => {
        const upload = Uploader.uploadDocuments(req.query.account_id, req.query.directory);
        upload(req, res, function (err, some) {
            if (err) {
                res.json({
                    success: false,
                    errors: err
                })
            } else {
                res.json({
                    success: true,
                    model: req.files
                })
            }
        })
    })

router.route('/avatar/:account_id')
    .post((req, res) => {
        console.log('req.params.account_id :', req.params.account_id);
        const singleUpload = Uploader.uploadAvatar(req.params.account_id);
        singleUpload(req, res, function (err, some) {
            if (err) {
                res.json({
                    success: false,
                    errors: err
                })
            } else {
                res.json({
                    success: true,
                    model: req.file
                })
            }
        })
    })

router.route('/forms/:form/:ref_no')
    .get((req, res)=>{
        model.findOne({reference_no:req.params.ref_no, form:req.params.form}).exec()
        .then(model=>{
            res.json({
                success: true,
                model
            })
        })
        .catch(errors=>{
            res.json({
                success: false,
                errors
            })
        })
    })
    .post((req, res) => {
        console.log("Upload_router ...")
        var ref_no = req.params.ref_no
        var form = req.params.form
        const singleUpload = Uploader.uploadForm(req.params.form, req.params.ref_no);
        singleUpload(req, res, function (err, some) {
            if (err) {
                res.json({
                    success: false,
                    errors: err
                })
            } else {
                new model({
                    url:req.file.location,
                    reference_no:ref_no,
                    form:form
                }).save()
                res.json({
                    success: true,
                    model: req.file
                })
            }
        })
    })

router.route("/activities")
.post((req, res)=>{
    model.find({reference_no:{$in:req.body}})
    .then(model=>{
        res.json({
            success: true,
            model
        })
    })
    .catch(errors=>{
        res.json({
            success: false,
            errors
        })
    })
})

module.exports = router;