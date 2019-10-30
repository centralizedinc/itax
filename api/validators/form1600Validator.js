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

    if (form.any_taxes_withheld === null || form.any_taxes_withheld === undefined) {
        error_messages.push({ page: 0, field: "any_taxes_withheld", error: "Please choose Yes or No." });
    } else if (form.any_taxes_withheld) {
        if (!form.sched1 || !form.sched1.length) {
            error_messages.push({ page: 2, field: "sched1", error: constant_helper.MANDATORY_FIELD('Part II - ATC') });
        } else {
            var is_empty_tax_base = form.sched1.filter(v => !v.tax_base);
            if (is_empty_tax_base < 0) {
                error_messages.push({ page: 2, field: "sched1", error: "Please fill up all fields in Schedule 1." });
            }
        }
    }

    if (!form.taxpayer || !form.taxpayer.line_of_business) {
        error_messages.push({ page: 1, field: "taxpayer.line_of_business", error: constant_helper.MANDATORY_FIELD("Line of Business") });
    }

    if (!form.category_of_agent) {
        error_messages.push({ page: 1, field: "category_of_agent", error: constant_helper.MANDATORY_FIELD('Category of Agent') });
    }

    return error_messages;
}

module.exports = {
    validate
}