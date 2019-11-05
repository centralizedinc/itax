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

    if (!form.taxpayer || !form.taxpayer.date_incorporation) {
        error_messages.push({
            page: 1,
            field: "taxpayer.date_incorporation",
            error: constant_helper.MANDATORY_FIELD('Date of Incorporation')
        });
    }

    if (!form.taxpayer || !form.taxpayer.contact_details || !form.taxpayer.contact_details.telno) {
        error_messages.push({
            page: 1,
            field: "taxpayer.contact_details.telno",
            error: constant_helper.MANDATORY_FIELD('Contact Number')
        });
    }

    if (!form.taxpayer || !form.taxpayer.contact_details || !form.taxpayer.contact_details.email) {
        error_messages.push({
            page: 1,
            field: "taxpayer.contact_details.email",
            error: constant_helper.MANDATORY_FIELD('Email Address')
        });
    }

    return error_messages;
}

module.exports = {
    validate
}