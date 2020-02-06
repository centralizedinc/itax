const router = require("express").Router();
const ActvityModel = require("../models/ActivityModel")
const service = require("../services/actvities_service")

router.route('/file/:tin')
.post((req, res) =>{
    service.file(req.params.tin)
    .then(model=>{
        res.json({
            success: true,
            model
        })
    })
    .catch(errors=>{
        console.log(errors)
        res.json({
            success: false,
            errors
        })
    })
})


router.route('/users/:id')
.get((req, res) =>{
    ActvityModel.find({'created_by.account_id':req.params.id})
    .then(model=>{
        res.json({
            success: true,
            model
        })
    })
    .catch(errors=>{
        console.log(errors)
        res.json({
            success: false,
            errors
        })
    })
})

.post((req, res)=>{
    console.log('saving :::', JSON.stringify(req.body))
    (new ActvityModel(req.body)).save()
    .then(model=>{
        console.log('saved :::', JSON.stringify(model))
        res.json({
            success: true,
            model
        })
    })
    .catch(errors=>{
        console.log(errors)
        res.json({
            success: false,
            errors
        })
    })
})


router.route('/:tin')
/**
 * @description find all activities by tin
 */
.get((req, res)=>{
    ActvityModel.find({subscribers:{$in:[req.params.tin]}}).exec()
    .then(model=>{
        res.json({
            success: true,
            model
        })
    })
    .catch(errors=>{
        console.log('ERROR ::: ', errors)
        res.json({
            success: false,
            errors
        })
    })
})

/**
 * @description create posts
 */
.post((req, res)=>{
    (new ActvityModel(req.body)).save()
    .then(model=>{
        res.json({
            success: true,
            model
        })
    })
    .catch(errors=>{
        console.log('ERROR ::: ', errors)
        res.json({
            success: false,
            errors
        })
    })
})

module.exports = router;