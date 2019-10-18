'use strict'

var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');

/**
 * @returns {Object} errors, due_date
 * @param {*} form_details 
 */
function validate(form_details) {
    console.log("validation form details(1601f): " + JSON.stringify(form_details))
    //validation begins ...
    var errors = [];

    const validated_return = commonValidator.validateReturnPeriodByMonthYear(form_details.return_period_year, form_details.return_period_month, 0);
    if (validated_return.errors && validated_return.errors.length) return { errors: validated_return.errors };
    else if (form_details.return_period_year >= 2018) {
        errors.push({ page: 0, field: "return_period_year", error: 'Cannot file for year 2018 onwards. Please use the Form 1601FQ', redirect_form: '1601fq' });
        return { errors };
    }
    else form_details.return_period = validated_return.return_period;
    console.log('form 1601f return period :', form_details.return_period);

    form_details.due_date = computeDueDate(form_details.return_period)
    console.log('form 1601f due date :', form_details.due_date);


    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));

    // validate required fields
    errors.push(...validateRequired(form_details));

    // Check Due date if late filing
    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);

    console.log('form 2550m validator errors: ', JSON.stringify(errors))


    return { errors, form_details }
}

/**
 * 
 * @param {Object} form 
 */
function validateRequired(form) {
    var errors = [];

    console.log('form.any_tax_withheld :', form.any_tax_withheld);
    if (form.any_tax_withheld === undefined || form.any_tax_withheld === null) {
        errors.push({ page: 0, field: "any_tax_withheld", error: constant_helper.MANDATORY_FIELD('Any Taxes Withheld') });
    } else if (form.any_tax_withheld) {
        if (!form.atc_list || !form.atc_list.length) {
            errors.push({ page: 2, field: "atc_list", error: constant_helper.MANDATORY_FIELD('ATC') });
        }
    }

    if (form.taxpayer && !form.taxpayer.line_of_business) {
        errors.push({ page: 1, field: "taxpayer.line_of_business", error: constant_helper.MANDATORY_FIELD('Line of Business') });
    }

    if (!form.category_of_agent) {
        errors.push({ page: 1, field: "category_of_agent", error: constant_helper.MANDATORY_FIELD('Category of Withholding Agent') });
    }

    return errors;
}

function computeDueDate(returnPeriod) {
    console.log("computeDueDate data: " + returnPeriod)
    var due_date = new Date();

    var month = new Date(returnPeriod).getMonth() + 1;

    //every 20th of the next month
    due_date.setDate(10);
    due_date.setMonth(month);

    return due_date;
}

module.exports = {
    validate
}