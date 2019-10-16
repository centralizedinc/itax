'use strict'
var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');

function validate(form_details) {
    console.log("validation form details(1603): " + JSON.stringify(form_details))
    //validation begins ...
    var errors = [];

    const validated_return = commonValidator.validateReturnPeriodByQuarter(form_details.return_period_year, form_details.quarter, 0);
    if (validated_return.errors && validated_return.errors.length) return { errors: validated_return.errors };
    else form_details.return_period = validated_return.return_period;
    console.log('form 1601e return period :', form_details.return_period);


    form_details.due_date = computeDueDate(form_details.return_period)
    console.log('form 1603 due date :', form_details.due_date);

    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));

    // validate required fields
    errors.push(...validateRequired(form_details));
    //latefiling computations
    // 25% total amount due
    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);

    console.log('form 1603 validator errors: ', JSON.stringify(errors));

    return { errors, form_details }
}

function computeDueDate(return_period) {
    var date = new Date(return_period);
    var due_date = new Date(date.getFullYear(), date.getMonth() + 1, 25);
    return due_date;
}

function validateRequired(form) {
    var error_messages = [];

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