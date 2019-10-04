"use strict";

const router = require("express").Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Dao
const AccountDao = require('../dao/AccountDao');

// Utils
const constant_helper = require('../utils/constant_helper');
const email_helper = require('../utils/email');

router.route('/login')
    .post(function (req, res, next) {
        passport.authenticate('login', function (err, user, info) {
            if (err) {
                return res.json({
                    error: err
                })
            }
            return res.json({
                model: user
            });
        })(req, res, next);
    })


router
    .route('/signup')
    .post(function (req, res, next) {
        passport.authenticate('signup', function (err, user, info) {
            console.log('err :', err);
            console.log('user :', user);
            if (err) {
                return res.json({
                    error: err
                })
            }
            return res.json({
                model: user
            });
        })(req, res, next);
    })

router
    .route('/confirmation/setup')
    .get((req, res) => {
        const account_id = jwt.decode(req.headers.access_token).account_id;

        AccountDao.modifyByAccountId(account_id, {
            status: 2
        })
            .then((model) => res.json({
                message: constant_helper.confirmation_success,
                model
            }))
            .catch((error) => res.json({
                error
            }));
    })

router
    .route('/confirmation/:code')
    .get((req, res) => {
        const retrieved_data = new Buffer(req.params.code, "base64").toString();
        var data = null;
        try {
            data = JSON.parse(retrieved_data);
        } catch (error) {
            return res.json({
                error: {
                    message: constant_helper.invalid_code
                }
            })
        }
        if (data) {
            const {
                account_id,
                expiry_date,
                date
            } = data;
            if (new Date(expiry_date).getTime() < new Date().getTime()) {
                return res.json({
                    error: {
                        message: constant_helper.confirmation_expired
                    }
                })
            }

            AccountDao.modifyByAccountId(account_id, {
                status: 1,
                confirmation_url: null
            })
                .then((model) => res.json({
                    message: constant_helper.confirmation_success,
                    model
                }))
                .catch((error) => res.json({
                    error
                }));
        }
    })

/***** SIGN UP USING GOOGLE ACCOUNT *****/
router.route('/google')
    .get(passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

router.route('/google/callback')
    .get(passport.authenticate('google', {
        session: false
    }), (req, res) => {
        const code = new Buffer(JSON.stringify(req.user)).toString('base64');
        res.redirect(`${process.env.VUE_APP_HOME_URL}confirmation/google/${code}`)
    });

/***** SIGN UP USING FACEBOOK ACCOUNT *****/
router.route('/facebook')
    .get(passport.authenticate('facebook', {
        scope: ["email"]
    }));

router.route('/facebook/callback')
    .get(passport.authenticate('facebook', {
        session: false
    }),
        (req, res) => {
            // res.json(req.user)
            const code = new Buffer(JSON.stringify(req.user)).toString('base64');
            res.redirect(`${process.env.VUE_APP_HOME_URL}confirmation/facebook/${code}`)
        });

router.route('/invitation')
    .post((req, res) => {
        const { email, name, sender } = req.body;
        email_helper.registerInvitation(email, name, sender)
            .then((model) => res.json({ success: true, model }))
            .catch((errors) => res.json({ success: false, errors }));
    })

module.exports = router;