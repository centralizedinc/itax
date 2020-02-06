'use strict'

var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');

/**
 * @returns {Object} errors, due_date
 * @param {*} form_details 
 */
function validate(form_details) {
    //validation begins ...
    var errors = [];

    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1))
    console.log('done validating taxpayer');

    // validate required fields
    errors.push(...validateRequired(form_details));
    console.log('done validating required fields');

    // checking due date if late filing

    var { error_messages, form_details } = commonValidator.checkNestedDueDate(form_details, "taxpayer_tax_payable", 3);
    errors.push(...error_messages);

    if (!form_details.spouse_tax_payable) {
        var { error_messages, form_details } = commonValidator.checkNestedDueDate(form_details, "spouse_tax_payable", 3);
        errors.push(...error_messages);
    }

    console.log('done checking due date');

    if (!errors || !errors.length) {
        form_details = computePayable(form_details);
    }

    return { errors, form_details }
}

function validateRequired(field) {
    console.log('Validating required fields...');
    var error_messages = [];

    // Validate Taxpayer

    if (!field.taxpayer || !field.taxpayer.filer_type) { //item 7
        error_messages.push({ page: 1, field: "taxpayer.filer_type", error: constant_helper.MANDATORY_FIELD("Taxpayer/Filer Type") });
    }

    if (!field.taxpayer_atc_code) { // item 8
        error_messages.push({ page: 1, field: "taxpayer_atc_code", error: constant_helper.MANDATORY_FIELD("ATC") });
    }

    if (!field.taxpayer || !field.taxpayer.individual_details || !field.taxpayer.individual_details.birthDate) { // item 11
        error_messages.push({ page: 1, field: "taxpayer.individual_details.birthDate", error: constant_helper.MANDATORY_FIELD("Date of Birth") });
    }

    if (!field.taxpayer || !field.taxpayer.contact_details || !field.taxpayer.contact_details.email) { // item 11
        error_messages.push({ page: 1, field: "taxpayer.contact_details.email", error: constant_helper.MANDATORY_FIELD("Email Address") });
    }

    if (!field.taxpayer || !field.taxpayer.individual_details || !field.taxpayer.individual_details.citizenship) { // item 13
        error_messages.push({ page: 1, field: "taxpayer.individual_details.citizenship", error: constant_helper.MANDATORY_FIELD("Citizenship") });
    }

    if (field.taxpayer_foreign_tax_credits === null || field.taxpayer_foreign_tax_credits === undefined) { // item 15
        error_messages.push({ page: 1, field: "taxpayer_foreign_tax_credits", error: constant_helper.MANDATORY_FIELD("Claiming Foreign Tax Credits") });
    }

    if (
        (!field.taxpayer_method_deduction &&
            field.taxpayer_atc_code == "II012") ||
        (!field.taxpayer_method_deduction &&
            field.taxpayer_atc_code == "II014") ||
        (!field.taxpayer_method_deduction &&
            field.taxpayer_atc_code == "II013")
    ) { // item 16A
        error_messages.push({ page: 1, field: "taxpayer_method_deduction", error: constant_helper.MANDATORY_FIELD("Method of deduction") });
    }


    // Validate Spouse

    // if (!field.spouse_details || !field.spouse_details.tin) { //item 17
    //     error_messages.push({ page: 2, field: "spouse_details.tin", error: constant_helper.MANDATORY_FIELD("Spouse's TIN") });
    // }

    // if (!field.spouse_details || !field.spouse_details.rdo_code) { // item 18
    //     error_messages.push({ page: 2, field: "spouse_details.rdo_code", error: constant_helper.MANDATORY_FIELD("Spouse's RDO Code") });
    // }

    // if (!field.spouse_details || !field.spouse_details.registered_name) { // item 21
    //     error_messages.push({ page: 2, field: "spouse_details.registered_name", error: constant_helper.MANDATORY_FIELD("Spouse's Name") });
    // }

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