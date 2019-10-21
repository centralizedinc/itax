'use strict'

var commonValidator = require('./commonValidator.js');

// utils
const constant_helper = require('../utils/constant_helper');

/**
 * @returns {Object} errors, due_date
 * @param {*} form_details 
 */
function validate(form_details) {
    //validation begins ...
    var errors = [];

    // if (!form_details.return_period) {
    //     errors.push({
    //         page: 0,
    //         field: "return_period",
    //         error: constant_helper.MANDATORY_FIELD('Date of Transaction')
    //     });
    //     return { errors };
    // }

    // form_details.due_date = computeDueDate(form_details.return_period);
    // console.log('form 2000ot due date :', form_details.due_date);

    // validate taxpayer
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));
    console.log('done validating taxpayer...');

    //validate required fields
    errors.push(...validateRequired(form_details));
    console.log('done validating required fields...');

    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 3);
    errors.push(...error_messages);
    console.log('done checking due date...');

    return { errors, form_details }
}

function validateRequired(form) {
    var error_messages = [];
    console.log('Validating required fields ...');
    if(!form.atc_code){
        error_messages.push({
            page: 0,
            field: "atc_code",
            error: constant_helper.MANDATORY_FIELD('ATC')
        });
    }

    if (!form.natureOfTransaction) {
        error_messages.push({
            page: 2,
            field: "natureOfTransaction",
            error: constant_helper.MANDATORY_FIELD('Nature of Transaction')
        });
    } else if (form.natureOfTransaction === 'real_property_capital' ||
        form.natureOfTransaction === 'real_property_ordinary') {
        if (!form.realPropertyClass) {
            error_messages.push({
                page: 2,
                field: "realPropertyClass",
                error: constant_helper.MANDATORY_FIELD('Classification of Real Property')
            });
        }
    }

    return error_messages;
}

function computeDueDate(return_period) {
    var return_period = new Date(return_period);
    var month = return_period.getMonth() + 1;
    const due_date = new Date(return_period.getFullYear(), month, 0);
    due_date.setDate(due_date.getDate() - 5);
    return due_date;
}


module.exports = {
    validate
}