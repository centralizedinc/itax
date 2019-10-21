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
    if (form.any_tax_withheld === null || form.any_tax_withheld === undefined) {
        error_messages.push({ page: 0, field: "any_tax_withheld", error: constant_helper.MANDATORY_FIELD('Any Taxes Withheld') });
    } else if(form.any_tax_withheld){
        if (!form.atc_list || !form.atc_list.length) {
            error_messages.push({ page: 2, field: "atc_list", error: constant_helper.MANDATORY_FIELD('ATC') });
        }
    }

    if (!form.category_of_agent) {
        error_messages.push({ page: 1, field: "category_of_agent", error: constant_helper.MANDATORY_FIELD('Category of Agent') });
    }
    return error_messages;
}

module.exports = {
    validate
}