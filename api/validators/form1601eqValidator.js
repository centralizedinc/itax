'use strict'
var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');

function validate(form_details) {
    //validation begins ...
    var errors = [];

    //validate taxpayer
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));
    console.log('done validating taxpayer...');

    // validate required fields
    errors.push(...validateRequired(form_details));
    console.log('done required fields...');

    // check due date if late filing
    var {
        error_messages,
        form_details
    } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);
    console.log('done checking due date...');

    return {
        errors,
        form_details
    }
}

function validateRequired(form) {
    var error_messages = [];
    console.log('Validating required fields...');
    if (!form.months_reflected || !Array.isArray(form.months_reflected) || !form.months_reflected.length) {
        error_messages.push({
            page: 0,
            field: "months_reflected",
            error: constant_helper.MANDATORY_FIELD('Months Reflected')
        });
    }

    return error_messages;
}

module.exports = {
    validate
}