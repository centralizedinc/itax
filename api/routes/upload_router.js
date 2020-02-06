var router = require("express").Router();

var Uploader = require('../utils/uploader')
var model = require('../models/FormModel')
var form1701QModel = require('../models/forms/form1701QModel');
var form2550MModel = require('../models/forms/form2550MModel');
var form2000OTModel = require('../models/forms/form2000OTModel');
var form1600WPModel = require('../models/forms/form1600WPModel');


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
        console.log("reference number details: " + JSON.stringify(req.params.ref_no))
        console.log("form details: " + JSON.stringify(req.params.form))
        var form_value = ""
        var go = false
        if(req.params.form){
            if(req.params.form == '1701q') {
                form_value = form1701QModel
                go = true
            }if(req.params.form === '2550w'){
                form_value = form2550MModel.
                go = true
            }if(req.params.form === '2000ot'){
                form_value = form2000OTModel
                go = true
            }if(req.params.form === '1600wp'){
                form_value = form1600WPModel
                go = true
            }
            console.log("form value data: ", go)
        }if(go==true){
 
            form_value.findOne({reference_no:req.params.ref_no}).exec()
        .then(model=>{
            console.log("upload router data model details: " + JSON.stringify(model))
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
        }
        
        
        

        // model.findOne({reference_no:req.params.ref_no, form:req.params.form}).exec()
        // .then(model=>{
        //     console.log("upload router data model details: " + JSON.stringify(model))
        //     res.json({
        //         success: true,
        //         model
        //     })
        // })
        // .catch(errors=>{
        //     res.json({
        //         success: false,
        //         errors
        //     })
        // })
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