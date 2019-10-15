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

    console.log('Return Period :', form_details.return_period);
    if (!form_details.return_period_year || !form_details.return_period_month || !form_details.return_period) {
        errors.push({ page: 0, field: "return_period", error: constant_helper.MANDATORY_FIELD('Return Period') });
        return { errors };
    }
    if (form_details.return_period_year >= 2018 || new Date(form_details.return_period).getFullYear() >= 2018) {
        errors.push({ page: 0, field: "return_period", error: 'Cannot file for year 2018 onwards. Please use the Form 1601FQ', redirect_form: '1601fq' });
        return { errors };
    }


    form_details.due_date = computeDueDate(form_details.return_period)
    console.log('form 1601f due date :', form_details.due_date);


    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));

    // validate required fields
    errors.push(...validateRequired(form_details));

    // Check Due date if late filing
    errors.push(...commonValidator.checkDueDate(form_details, 2));

    console.log('form 2550m validator errors: ', JSON.stringify(errors))

    
    return { errors, due_date: form_details.due_date }
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
    } else if(form.any_tax_withheld){
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
    due_date.setDate(20);
    due_date.setMonth(month);

    return due_date;
}

module.exports = {
    validate
}