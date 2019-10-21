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
    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);
    console.log('done checking due date...');

    return { errors, form_details }
}

function validateRequired(form) {
    var error_messages = [];
    console.log('Validating required fields...');
    if (!form.months_reflected || !Array.isArray(form.months_reflected) || !form.months_reflected.length) {
        error_messages.push({ page: 0, field: "months_reflected", error: constant_helper.MANDATORY_FIELD('Months Reflected') });
    }

    if (form.taxes_withheld === undefined || form.taxes_withheld === null) {
        error_messages.push({ page: 0, field: "taxes_withheld", error: constant_helper.MANDATORY_FIELD('Any Taxes Withheld') });
    } 
    // else if (form.taxes_withheld) {
    //     if (!form.atc_list || !form.atc_list.length) {
    //         error_messages.push({ page: 2, field: "atc_list", error: constant_helper.MANDATORY_FIELD('ATC') });
    //     }
    // }

    if (form.taxpayer && !form.taxpayer.line_of_business) {
        error_messages.push({ page: 1, field: "taxpayer.line_of_business", error: constant_helper.MANDATORY_FIELD('Line of Business') });
    }

    if (!form.category_of_agent) {
        error_messages.push({ page: 1, field: "category_of_agent", error: constant_helper.MANDATORY_FIELD('Category of Withholding Agent') });
    }

    return error_messages;
}

module.exports = {
    validate
}