'use strict'

var Form2550MModel = require('../models/forms/form2550MModel.js');
var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');
/**
 * 
 * @param {*} form_details 
 * @returns [Array] errors
 */
function validate(form_details) {
    console.log("validation form details: " + JSON.stringify(form_details))
    //validation begins ...
    var errors = [];
    form_details.due_date = computeDueDate(form_details.returnPeriod)
    // console.log("due: " + due)
    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer));

    // validate required fields
    errors.push(...validateRequired(form_details));
    //latefiling computations
    // 25% total amount due
    if (commonValidator.isLateFiling(form_details.due_date)) {
        // Compute Surcharge
        const surcharge = commonValidator.computeSurcharges(form_details.amtPaybl);
        if (form_details.surcharge !== surcharge) {
            errors.push({
                field: 'surcharge',
                error: `Surcharge amount must be ${surcharge}`
            })
        }
        // Compute Interest
        const interest = commonValidator.computeInterest(form_details.due_date, form_details.amtPaybl);
        if (form_details.interest !== interest) {
            errors.push({
                field: 'interest',
                error: `Interest amount must be ${interest}`
            })
        }
        // Compute Compromise
        const compromise = commonValidator.computeCompromise(form_details.due_date, form_details.amtPaybl);
        if (form_details.compromise !== compromise) {
            errors.push({
                field: 'compromise',
                error: `Compromise amount must be ${compromise}`
            })
        }
    }

    console.log('form 2550m validator errors: ', JSON.stringify(errors))

    return errors
}

/**
 * 
 * @param {form2550MModel} form 
 */
function validateRequired(form) {
    var error_messages = [];

    if (!form.taxpayer.line_of_business) {
        error_messages.push({ field: "taxpayer.line_of_business", error: constant_helper.MANDATORY_FIELD('Line of Business') });
    }

    if (!form.returnPeriodYear || !form.returnPeriodMonth || !form.returnPeriod) {
        error_messages.push({ field: "returnPeriod", error: constant_helper.MANDATORY_FIELD('Return Period') });
    }

    // if (!form.sched1 || !form.sched1.length) {
    //     error_messages.push({ field: "atc", error: constant_helper.MANDATORY_FIELD('Schedule 1') });
    // } else {
    //     form.sched1.forEach((data, index) => {
    //         if (!data.description) {
    //             error_messages.push({ field: "atc", error: constant_helper.MANDATORY_FIELD(`Description at schedule 1 item ${index + 1}`) });
    //         }
    //         if (!data.atc) {
    //             error_messages.push({ field: "atc", error: constant_helper.MANDATORY_FIELD(`ATC at schedule 1 item ${index + 1}`) });
    //         }
    //         if (!data.amount) {
    //             error_messages.push({ field: "atc", error: constant_helper.MANDATORY_FIELD(`Amount of Sales at schedule 1 item ${index + 1}`) });
    //         }
    //         if (!data.output_tax) {
    //             error_messages.push({ field: "atc", error: constant_helper.MANDATORY_FIELD(`Output Tax at schedule 1 item ${index + 1}`) });
    //         }
    //     })
    // }
    return error_messages;
}

function computeDueDate(returnPeriod) {
    console.log("computeDueDate data: " + returnPeriod)
    var due_date = new Date();

    var month = returnPeriod.getMonth() + 1;

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