const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// Dao
const AccountDao = require('../dao/AccountDao');
const UserDao = require('../dao/UserDao');

// Utils
const ApplicationSettings = require('../utils/ApplicationSettings');
const jwt = require('jsonwebtoken');

passport.use(new FacebookStrategy({
    clientID: ApplicationSettings.getValue("FACEBOOK_CLIENT_ID"),
    clientSecret: ApplicationSettings.getValue("FACEBOOK_CLIENT_SECRET"),
    callbackURL: ApplicationSettings.getValue("FACEBOOK_CALLBACK_URL"),
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'first_name', 'last_name', 'middle_name']
},
    function (facebook_access_token, refreshToken, profile, done) {
        signInFacebook(profile, facebook_access_token)
            .then((result) => {
                done(null, result);
            }).catch((err) => {
                done(err);
            });
    }
));

/**
 * 
 * @param {Object} profile 
 * @param {String} facebook_access_token 
 */
function signInFacebook(profile, facebook_access_token) {
    // return Promise.resolve();
    return new Promise((resolve, reject) => {
        var result = {
            is_authenticated: false
        }
        AccountDao.findByFacebookID(profile.id)
            .then((account) => {
                if (!account) {
                    result.new_account = true;
                    return AccountDao.create({
                        method: 'facebook',
                        email: profile.emails[0].value,
                        facebook_id: profile.id,
                        facebook_access_token,
                        status: 1
                    })
                }
                else return account
            })
            .then((account) => {
                const session_token = jwt.sign({
                    account_id: account.account_id,
                    email: account.email,
                    date: new Date()
                }, ApplicationSettings.getValue("JWT_SECRET_TOKEN"))
                result.token = session_token
                return AccountDao.modifyById(account._id, { session_token, facebook_access_token })
            })
            .then((account) => {
                result.account = account;
                if (result.new_account) return UserDao.create({
                    account_id: result.account.account_id,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    name: {
                        first: profile.name.givenName,
                        last: profile.name.familyName
                    }
                })
                return UserDao.findOneByAccountID(result.account.account_id);
            })
            .then((user) => {
                result.user = user;
                resolve(result)
            })
            .catch((err) => {
                console.log('err :', err);
                reject(err)
            });
    })
}