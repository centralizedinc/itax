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
    if (form.taxes_withheld === null || form.taxes_withheld === undefined) {
        error_messages.push({ page: 0, field: "taxes_withheld", error: constant_helper.MANDATORY_FIELD('Any Taxes Withheld') });
    } else if(form.taxes_withheld){
        if(!form.compensation){
            error_messages.push({ page: 2, field: "compensation", error: constant_helper.MANDATORY_FIELD('Total Amount Compensation') });
        }

        if(!form.tax_required){
            error_messages.push({ page: 2, field: "tax_required", error: constant_helper.MANDATORY_FIELD('Tax Required to be Withheld') });
        }
    }

    if (!form.category_of_agent) {
        error_messages.push({ page: 1, field: "category_of_agent", error: constant_helper.MANDATORY_FIELD('Any Taxes Withheld') });
    }

    if (!form.taxpayer || !form.taxpayer.line_of_business) {
        error_messages.push({ page: 1, field: "taxpayer.line_of_business", error: constant_helper.MANDATORY_FIELD('Line of Business') });
    }

    return error_messages;
}

module.exports = {
    validate
}