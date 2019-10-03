var router = require("express").Router();

var Uploader = require('../utils/uploader')


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
                    model: req.files
                })
            }
        })
    })

module.exports = router;