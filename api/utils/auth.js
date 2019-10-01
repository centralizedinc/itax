var UserDetailsSchema = require('../models/userDetails');

var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'iT@xAp1S3rv1c3s';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    UserDetailsSchema.findById(jwt_payload.id, (err, user) => {
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });

});


passport.use(strategy);


module.exports = passport;