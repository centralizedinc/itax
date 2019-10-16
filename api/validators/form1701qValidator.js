'use strict'

var Form1701QModel = require('../models/forms/form1701QModel.js');
var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');

/**
 * @returns {Object} errors, due_date
 * @param {*} form_details 
 */
function validate(form_details) {
    console.log("validation form details(1701q): " + JSON.stringify(form_details))
    //validation begins ...
    var errors = [];

    const validated_return = commonValidator.validateReturnPeriodByQuarter(form_details.return_period_year, form_details.quarter, 0);
    if (validated_return.errors && validated_return.errors.length) return { errors: validated_return.errors };
    else form_details.return_period = validated_return.return_period;
    console.log('form 1701q return period :', form_details.return_period);

    form_details.due_date = computeDueDate(form_details.return_period)
    console.log('form_details.due_date :', form_details.due_date);
    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1))
    // validate required fields
    errors.push(...validateRequired(form_details));

    // LATE FILING
    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 3);
    errors.push(...error_messages);

    console.log('form 1701q validator errors: ', JSON.stringify(errors))

    return errors
}

function validateRequired(field) {
    var error_messages = [];

    // Validate Taxpayer

    if (!field.taxpayer || !field.taxpayer.tax_filer_type) { //item 7
        error_messages.push({ page: 1, field: "taxpayer.tax_filer_type", error: constant_helper.MANDATORY_FIELD("Taxpayer/Filer Type") });
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

    if (!field.taxpayer || !field.taxpayer.citizenship) { // item 13
        error_messages.push({ page: 1, field: "taxpayer.citizenship", error: constant_helper.MANDATORY_FIELD("Citizenship") });
    }

    if (field.claiming_tax_credits === null || field.claiming_tax_credits === undefined) { // item 15
        error_messages.push({ page: 1, field: "taxCredits", error: constant_helper.MANDATORY_FIELD("Claiming Foreign Tax Credits") });
    }

    if (!field.method_deduction) { // item 16A
        error_messages.push({ page: 1, field: "method_deduction", error: constant_helper.MANDATORY_FIELD("Method of deduction") });
    }


    // Validate Spouse

    if (!field.spouse_details || !field.spouse_details.tin) { //item 17
        error_messages.push({ page: 2, field: "spouse_details.tin", error: constant_helper.MANDATORY_FIELD("Spouse's TIN") });
    }

    if (!field.spouse_details || !field.spouse_details.rdo_code) { // item 18
        error_messages.push({ page: 2, field: "spouse_details.rdo_code", error: constant_helper.MANDATORY_FIELD("Spouse's RDO Code") });
    }

    if (!field.spouse_details || !field.spouse_details.registered_name) { // item 21
        error_messages.push({ page: 2, field: "spouse_details.registered_name", error: constant_helper.MANDATORY_FIELD("Spouse's Name") });
    }

    return error_messages;
}


function computeDueDate(return_period) {
    console.log("computeDueDate data: " + return_period)
    var due_date = new Date();

    var month = return_period.getMonth();
    // every 15th of the quarter May 15, Aug 15, Nov 15
    due_date.setDate(15);
    due_date.setMonth(month);
    due_date.setFullYear(return_period_year)

    return due_date;
}

/**
 * 
 * @param {form1701qModel} form 
 */
function validateComputations(form) {
    var error_messages = [];

    var item12A = 0,
        item12B = 0,
        item16A = 0,
        item16B = 0,
        item17F = 0,
        item18A = 0,
        item18B = 0,
        item18C = 0,
        item18D = 0,
        item18P = 0,
        item19 = 0,
        item20A = 0,
        item20B = 0,
        item20C = 0,
        item20F = 0,
        item21 = 0,
        item22 = 0,
        item23A = 0,
        item23B = 0,
        item23C = 0,
        item23G = 0,
        item24 = 0,
        item25D = 0,
        item26 = 0,
        surcharge = 0,
        interest = 0,
        compromise = 0



}

module.exports = {
    validate
}