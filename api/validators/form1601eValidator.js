    'use strict'

var Form1601EModel = require('../models/forms/form1601EModel.js');
var commonValidator = require('./commonValidator.js');

// utils
const constant_helper = require('../utils/constant_helper');

/**
 * @returns {Object} errors, due_date
 * @param {*} form_details 
 */
function validate(form_details) {
    console.log("validation form details(1601e): " + JSON.stringify(form_details))
    //validation begins ...
    var errors = [];

    const validated_return = commonValidator.validateReturnPeriodByMonthYear(form_details.return_period_year, form_details.return_period_month, 0);
    if (validated_return.errors && validated_return.errors.length) return { errors: validated_return.errors };
    else form_details.return_period = validated_return.return_period;
    console.log('form 1601e return period :', form_details.return_period);

    form_details.due_date = computeDueDate(form_details.return_period)
    console.log('form 1601e due date :', form_details.due_date);
    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));

    errors.push(...validateRequired(form_details));

    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);

    console.log('form 1601e validator errors: ', JSON.stringify(errors))

    return { errors, form_details }
}

function validateRequired(form) {
    var errors = []
    console.log('form.taxes_withheld :', form.taxes_withheld);
    if (form.taxes_withheld === undefined || form.taxes_withheld === null) {
        errors.push({ page: 0, field: "taxes_withheld", error: constant_helper.MANDATORY_FIELD('Any Taxes Withheld') });
    } else if (form.taxes_withheld) {
        if (!form.atc_list || !form.atc_list.length) {
            errors.push({ page: 2, field: "atc_list", error: constant_helper.MANDATORY_FIELD('ATC') });
        }
    }

    if (!form.taxpayer.line_of_business) {
        errors.push({ page: 1, field: "taxpayer.line_of_business", error: constant_helper.MANDATORY_FIELD('Line of Business') });
    }

    if (!form.categoryOfAgent) {
        errors.push({ page: 1, field: "category_of_agent", error: constant_helper.MANDATORY_FIELD('Category of Withholding Agent') });
    }
}

function computeDueDate(return_period) {
    var due_date = new Date();

    var month = return_period.getMonth() + 1;

    //every 10th of the next month
    due_date.setDate(10);
    due_date.setMonth(month);

    return due_date;
}



module.exports = {
    validate
}