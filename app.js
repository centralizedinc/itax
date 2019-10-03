'use strict'

//imports
//#############################################################################
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
const serveStatic = require('serve-static');

// SET-UP
//#############################################################################
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(serveStatic(__dirname + "/dist"));
// SETUP CORS
//#############################################################################
var cors = require('cors')

app.use(cors());
app.options('*', cors())
// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     // Pass to next layer of middleware
//     next();
// });

// SETUP DB
//#############################################################################
require('./api/utils/db_connector.js').connect();

//AUTH SETUP
//#############################################################################
var passport = require('./api/utils/auth');
app.use(passport.initialize());

// SETUP ROUTES
//#############################################################################

app.use('/oauth', require('./api/routes/oauth_router'));


app.use('/auth', require('./api/routes/auth_router'));
app.use('/notify', require('./api/routes/notification_router'));
app.use('/profile', require('./api/routes/profile_router'));
// app.use('/reference', passport.authenticate('jwt', {session: false}), require('./api/routes/reference_router'));
app.use('/reference', require('./api/routes/reference_router'));
app.use('/tax/returns', require('./api/routes/returns_router'));
app.use('/taxpayer', require('./api/routes/taxpayer_router'));
app.use('/users', require('./api/routes/user_router'));
app.use('/validate', require('./api/routes/validate_router'));
app.use('/connections', require('./api/routes/relationship_router'))

// START SERVER
//#############################################################################
app.listen(process.env.PORT || 5000, function () {
    console.log('running on port', process.env.PORT || 5000);
});