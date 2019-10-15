'use strict'

var form1601FModel = require('../models/forms/form1601FModel.js');
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

    // if (!form_details.returnPeriodYear || !form_details.returnPeriodMonth || !form_details.returnPeriod) {
    //     errors.push({ page: 0, field: "returnPeriod", error: constant_helper.MANDATORY_FIELD('Return Period') });
    //     return { errors };
    // }

    // form_details.due_date = computeDueDate(form_details.returnPeriod)
    // console.log('form 2550m due date :', form_details.due_date);

    // //validate required fields
    // errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));

    // // validate required fields
    // errors.push(...validateRequired(form_details));
    // //latefiling computations
    // // 25% total amount due
    // if (commonValidator.isLateFiling(form_details.due_date)) {
    //     console.log('Late filling ...');
    //     // Compute Surcharge
    //     const surcharge = commonValidator.computeSurcharges(form_details.amtPaybl);
    //     form_details.surcharge = form_details.surcharge ? form_details.surcharge : 0;
    //     console.log('Surcharge :', surcharge, ':', form_details.surcharge);
    //     if (commonValidator.formatAmount(form_details.surcharge) !== commonValidator.formatAmount(surcharge)) {
    //         errors.push({
    //             page: 2,
    //             field: 'surcharge',
    //             error: `Surcharge amount must be ${commonValidator.formatAmount(surcharge)}`
    //         })
    //     }
    //     // Compute Interest
    //     const interest = commonValidator.computeInterest(form_details.due_date, form_details.amtPaybl);
    //     form_details.interest = form_details.interest ? form_details.interest : 0;
    //     console.log('Interest :', interest, ':', form_details.interest);
    //     if (commonValidator.formatAmount(form_details.interest) !== commonValidator.formatAmount(interest)) {
    //         errors.push({
    //             page: 2,
    //             field: 'interest',
    //             error: `Interest amount must be ${commonValidator.formatAmount(interest)}`
    //         })
    //     }
    //     // Compute Compromise
    //     const compromise = commonValidator.computeCompromise(form_details.due_date, form_details.amtPaybl);
    //     form_details.compromise = form_details.compromise ? form_details.compromise : 0;
    //     console.log('Compromise :', compromise, ':', form_details.compromise);
    //     if (commonValidator.formatAmount(form_details.compromise) !== commonValidator.formatAmount(compromise)) {
    //         errors.push({
    //             page: 2,
    //             field: 'compromise',
    //             error: `Compromise amount must be ${commonValidator.formatAmount(compromise)}`
    //         })
    //     }
    // }

    // console.log('form 2550m validator errors: ', JSON.stringify(errors))

    // return { errors, due_date: form_details.due_date }
    return {errors}
}

/**
 * 
 * @param {form1601FModel} form 
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

module.exports = {
    validate
}