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
    
    // check due date if late filing
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
    var error_messages = [];
    console.log('Validating required fields ...');

    if (!form.taxpayer || !form.taxpayer.contact_details || !form.taxpayer.contact_details.email) {
        error_messages.push({ page: 1, field: "taxpayer.contact_details.email", error: constant_helper.MANDATORY_FIELD("Email Address") });
    }

    if (form.taxes_withheld === null || form.taxes_withheld === undefined) {
        error_messages.push({ page: 0, field: "taxes_withheld", error: constant_helper.MANDATORY_FIELD('Any Taxes Withheld') });
    } else if(form.taxes_withheld){
        if (!form.sched1 || !form.sched1.length) {
            error_messages.push({ page: 2, field: "sched1", error: constant_helper.MANDATORY_FIELD('Schedule 1') });
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