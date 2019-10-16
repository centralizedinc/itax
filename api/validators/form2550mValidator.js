'use strict'

var Form2550MModel = require('../models/forms/form2550MModel.js');
var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');

/**
 * @returns {Object} errors, due_date
 * @param {*} form_details 
 */
function validate(form_details) {
    console.log("validation form details(2550m): " + JSON.stringify(form_details))
    //validation begins ...
    var errors = [];

    const validated_return = commonValidator.validateReturnPeriodByMonthYear(form_details.return_period_year, form_details.return_period_month, 0);
    if (validated_return.errors && validated_return.errors.length) return { errors: validated_return.errors };
    else form_details.return_period = validated_return.return_period;
    console.log('form 2550m return period :', form_details.return_period);

    form_details.due_date = computeDueDate(form_details.return_period)
    console.log('form 2550m due date :', form_details.due_date);

    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));

    // validate required fields
    errors.push(...validateRequired(form_details));
    //latefiling computations
    // 25% total amount due
    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);

    console.log('form 2550m validator errors: ', JSON.stringify(errors));

    return { errors, form_details }
}

/**
 * 
 * @param {form2550MModel} form 
 */
function validateRequired(form) {
    var error_messages = [];

    if (!form.taxpayer.line_of_business) {
        error_messages.push({ page: 1, field: "taxpayer.line_of_business", error: constant_helper.MANDATORY_FIELD('Line of Business') });
    }

    if (!form.sched1 || !form.sched1.length) {
        error_messages.push({ page: 2, field: "atc", error: constant_helper.MANDATORY_FIELD('Schedule 1') });
    }
    return error_messages;
}

function computeDueDate(return_period) {
    console.log("computeDueDate data: " + return_period)
    var due_date = new Date();

    var month = new Date(return_period).getMonth() + 1;

    //every 20th of the next month
    due_date.setDate(20);
    due_date.setMonth(month);

    return due_date;
}

/**
 * 
 * @param {form2550MModel} form 
 */
function validateComputations(form) {
    var error_messages = [];

    var item12A = 0,
        item12B = 0,
        item16A = 0,
        item16B = 0,
        item17F = 0, //form.totalAllowableLessInputTax
        item18A = 0,
        item18B = 0,
        item18C = 0,
        item18D = 0,
        item18P = 0,
        item19 = 0, //form.totalAvailableInputTax
        item20A = 0,
        item20B = 0,
        item20C = 0,
        item20F = 0, // form.totalDeductionFrInputTax
        item21 = 0,
        item22 = 0,
        item23A = 0,
        item23B = 0,
        item23C = 0,
        item23G = 0, //form.totalCredits
        item24 = 0,
        item25D = 0,
        item26 = 0,
        surcharge = 0,
        interest = 0,
        compromise = 0



}

module.exports = {
    validate
}