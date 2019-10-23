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

    //validate taxpayer
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));
    console.log('done validating taxpayer...');

    // validate required fields
    errors.push(...validateRequired(form_details));
    console.log('done validating required fields...');

    // Check Due date if late filing
    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);
    console.log('done checking due date...');

    return { errors, form_details }
}

/**
 * 
 * @param {Object} form 
 */
function validateRequired(form) {
    var errors = [];
    console.log('Validating required fields...');
    if (form.any_tax_withheld === undefined || form.any_tax_withheld === null) {
        errors.push({ page: 0, field: "any_tax_withheld", error: constant_helper.MANDATORY_FIELD('Any Taxes Withheld') });
    } else if (form.any_tax_withheld) {
        if (!form.atc_list || !form.atc_list.length) {
            errors.push({ page: 2, field: "atc_list", error: constant_helper.MANDATORY_FIELD('ATC') });
        } else {
            if (!form.atc_list[0].atc_code) {
                errors.push({ page: 2, field: "atc_list", error: constant_helper.MANDATORY_FIELD('ATC Code') });
            }

            if (!form.atc_list[0].tax_base) {
                errors.push({ page: 2, field: "atc_list", error: constant_helper.MANDATORY_FIELD('Tax Base') });
            }
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

module.exports = {
    validate
}