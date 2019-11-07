'use strict'
var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');

function validate(form_details) {
    //validation begins ...
    var errors = [];

    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));
    console.log('done validating taxpayer...');

    // validate required fields
    errors.push(...validateRequired(form_details));
    console.log('done validating required fields...');

    // checking due date if late filing
    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);
    console.log('done checking due date...');

    return { errors, form_details }
}

function validateRequired(form) {
    var error_messages = [];
    console.log('Validating required fields ...');
    
    if (!form.atc_code) {
        error_messages.push({ page: 1, field: "atc_code", error: constant_helper.MANDATORY_FIELD('ATC') });
    }

    if (!form.tax_type_code) {
        error_messages.push({ page: 1, field: "tax_type_code", error: constant_helper.MANDATORY_FIELD('Tax type Code') });
    }

    if (!form.voluntary_payment) {
        error_messages.push({ page: 1, field: "voluntary_payment", error: constant_helper.MANDATORY_FIELD('Manner of Payment') });
    }

    if (!form.per_audit_account) {
        error_messages.push({ page: 1, field: "per_audit_account", error: constant_helper.MANDATORY_FIELD('Manner of Payment') });
    }

    if (!form.type_payment) {
        error_messages.push({ page: 1, field: "type_payment", error: constant_helper.MANDATORY_FIELD('Type of Payment') });
    }

    return error_messages;
}

module.exports = {
    validate
}