'use strict'

var commonValidator = require('./commonValidator.js');

// utils
const constant_helper = require('../utils/constant_helper');

/**
 * @returns {Object} errors, due_date
 * @param {*} form_details 
 */
function validate(form_details) {
    console.log("validation form details(2000ot): " + JSON.stringify(form_details))
    //validation begins ...
    var errors = [];

    if (!form_details.return_period) {
        errors.push({
            page: 0,
            field: "return_period",
            error: constant_helper.MANDATORY_FIELD('Date of Transaction')
        });
        return { errors };
    }

    form_details.due_date = computeDueDate(form_details.return_period);
    console.log('form 2000ot due date :', form_details.due_date);

    // validate Taxpayer
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));

    //validate required fields
    errors.push(...validateRequired(form_details));

    errors.push(...commonValidator.checkDueDate(form_details, 3));
    // if (commonValidator.isLateFiling(form_details.due_date)) {
    //     console.log('Late filling ...');
    //     // Compute Surcharge
    //     const surcharge = commonValidator.computeSurcharges(form_details.taxStillDue);
    //     form_details.surcharge = form_details.surcharge ? form_details.surcharge : 0;
    //     console.log('Surcharge :', surcharge, ':', form_details.surcharge);
    //     if (commonValidator.formatAmount(form_details.surcharge) !== commonValidator.formatAmount(surcharge)) {
    //         errors.push({
    //             page: 3,
    //             field: 'surcharge',
    //             error: `Surcharge amount must be ${commonValidator.formatAmount(surcharge)}`
    //         })
    //     }
    //     // Compute Interest
    //     const interest = commonValidator.computeInterest(form_details.due_date, form_details.taxStillDue);
    //     form_details.interest = form_details.interest ? form_details.interest : 0;
    //     console.log('Interest :', interest, ':', form_details.interest);
    //     if (commonValidator.formatAmount(form_details.interest) !== commonValidator.formatAmount(interest)) {
    //         errors.push({
    //             page: 3,
    //             field: 'interest',
    //             error: `Interest amount must be ${commonValidator.formatAmount(interest)}`
    //         })
    //     }
    //     // Compute Compromise
    //     const compromise = commonValidator.computeCompromise(form_details.due_date, form_details.taxStillDue);
    //     form_details.compromise = form_details.compromise ? form_details.compromise : 0;
    //     console.log('Compromise :', compromise, ':', form_details.compromise);
    //     if (commonValidator.formatAmount(form_details.compromise) !== commonValidator.formatAmount(compromise)) {
    //         errors.push({
    //             page: 3,
    //             field: 'compromise',
    //             error: `Compromise amount must be ${commonValidator.formatAmount(compromise)}`
    //         })
    //     }
    // }

    console.log('form 2000ot validator errors: ', JSON.stringify(errors))

    return { errors, due_date: form_details.due_date }
}

function validateRequired(form) {
    var error_messages = [];

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
    var lastDate = return_period.getMonth() + 1;
    lastDate = lastDate - 5;
    const due_date = new Date(return_period.getFullYear(), lastDate, return_period.getMonth());
    return due_date;
}


module.exports = {
    validate
}