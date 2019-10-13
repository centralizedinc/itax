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

    if (!form_details.returnPeriodYear || !form_details.returnPeriodMonth || !form_details.returnPeriod) {
        errors.push({ page: 0, field: "returnPeriod", error: constant_helper.MANDATORY_FIELD('Return Period') });
        return { errors };
    }

    form_details.due_date = computeDueDate(form_details.returnPeriod)
    console.log('form 2550m due date :', form_details.due_date);

    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));

    // validate required fields
    errors.push(...validateRequired(form_details));
    //latefiling computations
    // 25% total amount due
    if (commonValidator.isLateFiling(form_details.due_date)) {
        console.log('Late filling ...');
        // Compute Surcharge
        const surcharge = commonValidator.computeSurcharges(form_details.amtPaybl);
        form_details.surcharge = form_details.surcharge ? form_details.surcharge : 0;
        console.log('Surcharge :', surcharge, ':', form_details.surcharge);
        if (commonValidator.formatAmount(form_details.surcharge) !== commonValidator.formatAmount(surcharge)) {
            errors.push({
                page: 2,
                field: 'surcharge',
                error: `Surcharge amount must be ${commonValidator.formatAmount(surcharge)}`
            })
        }
        // Compute Interest
        const interest = commonValidator.computeInterest(form_details.due_date, form_details.amtPaybl);
        form_details.interest = form_details.interest ? form_details.interest : 0;
        console.log('Interest :', interest, ':', form_details.interest);
        if (commonValidator.formatAmount(form_details.interest) !== commonValidator.formatAmount(interest)) {
            errors.push({
                page: 2,
                field: 'interest',
                error: `Interest amount must be ${commonValidator.formatAmount(interest)}`
            })
        }
        // Compute Compromise
        const compromise = commonValidator.computeCompromise(form_details.due_date, form_details.amtPaybl);
        form_details.compromise = form_details.compromise ? form_details.compromise : 0;
        console.log('Compromise :', compromise, ':', form_details.compromise);
        if (commonValidator.formatAmount(form_details.compromise) !== commonValidator.formatAmount(compromise)) {
            errors.push({
                page: 2,
                field: 'compromise',
                error: `Compromise amount must be ${commonValidator.formatAmount(compromise)}`
            })
        }
    }

    console.log('form 2550m validator errors: ', JSON.stringify(errors))

    return { errors, due_date: form_details.due_date }
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

function computeDueDate(returnPeriod) {
    console.log("computeDueDate data: " + returnPeriod)
    var due_date = new Date();

    var month = new Date(returnPeriod).getMonth() + 1;

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