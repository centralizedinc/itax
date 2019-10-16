'use strict'
var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');

function validate(form_details) {

        return { errors: [], form_details}
    }

module.exports = {
    validate
}