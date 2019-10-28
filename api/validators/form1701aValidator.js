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
    var { error_messages, form_details } = commonValidator.checkNestedDueDate(form_details, "taxpayer_tax_payable", 2);
    errors.push(...error_messages);
    var { error_messages, form_details } = commonValidator.checkNestedDueDate(form_details, "spouse_tax_payable", 2);
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
    
    if (!form.taxpayer || !form.taxpayer.individual_details || !form.taxpayer.individual_details.birthDate) {
        error_messages.push({ page: 1, field: "taxpayer.individual_details.birthDate", error: constant_helper.MANDATORY_FIELD("Taxpayer's Date of Birth") });
    }
    
    if (!form.taxpayer || !form.taxpayer.individual_details || !form.taxpayer.individual_details.email) {
        error_messages.push({ page: 1, field: "taxpayer.individual_details.email", error: constant_helper.MANDATORY_FIELD("Taxpayer's Email") });
    }
    
    if (!form.taxpayer || !form.taxpayer.individual_details || !form.taxpayer.individual_details.citizenship) {
        error_messages.push({ page: 1, field: "taxpayer.individual_details.citizenship", error: constant_helper.MANDATORY_FIELD("Taxpayer's Citizenship") });
    }
    
    if (!form.taxpayer || !form.taxpayer.individual_details || !form.taxpayer.individual_details.filer_type) {
        error_messages.push({ page: 1, field: "taxpayer.individual_details.filer_type", error: constant_helper.MANDATORY_FIELD("Taxpayer's Filer Type") });
    }
    
    if (!form.taxpayer || !form.taxpayer.individual_details || !form.taxpayer.individual_details.taxpayer_atc_code) {
        error_messages.push({ page: 1, field: "taxpayer.individual_details.taxpayer_atc_code", error: constant_helper.MANDATORY_FIELD("Taxpayer's ATC") });
    }

    return error_messages;
}

module.exports = {
    validate
}