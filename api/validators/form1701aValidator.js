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

    if (!errors || !errors.length) {
        form_details = computePayable(form_details);
    }

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

    if (!form.taxpayer || !form.taxpayer.contact_details || !form.taxpayer.contact_details.email) {
        error_messages.push({ page: 1, field: "taxpayer.contact_details.email", error: constant_helper.MANDATORY_FIELD("Taxpayer's Email") });
    }

    if (!form.taxpayer || !form.taxpayer.individual_details || !form.taxpayer.individual_details.citizenship) {
        error_messages.push({ page: 1, field: "taxpayer.individual_details.citizenship", error: constant_helper.MANDATORY_FIELD("Taxpayer's Citizenship") });
    }

    if (!form.taxpayer || !form.taxpayer.filer_type) {
        error_messages.push({ page: 1, field: "taxpayer.filer_type", error: constant_helper.MANDATORY_FIELD("Taxpayer's Filer Type") });
    }

    if (!form.taxpayer_atc_code) {
        error_messages.push({ page: 1, field: "taxpayer_atc_code", error: constant_helper.MANDATORY_FIELD("Taxpayer's ATC") });
    }

    return error_messages;
}

function computePayable(form) {
    if (form.taxpayer_tax_payable && form.spouse_tax_payable) {
        form.tax_due = parseFloat(form.taxpayer_tax_payable.tax_due || 0) + parseFloat(form.spouse_tax_payable.tax_due || 0);
        form.surcharge = parseFloat(form.taxpayer_tax_payable.surcharge || 0) + parseFloat(form.spouse_tax_payable.surcharge || 0);
        form.interest = parseFloat(form.taxpayer_tax_payable.interest || 0) + parseFloat(form.spouse_tax_payable.interest || 0);
        form.compromise = parseFloat(form.taxpayer_tax_payable.compromise || 0) + parseFloat(form.spouse_tax_payable.compromise || 0);
        form.penalties = parseFloat(form.taxpayer_tax_payable.penalties || 0) + parseFloat(form.spouse_tax_payable.penalties || 0);
        form.total_amount_payable = parseFloat(form.taxpayer_tax_payable.total_amount_payable || 0) + parseFloat(form.spouse_tax_payable.total_amount_payable || 0);
    }
    return form;
}

module.exports = {
    validate
}