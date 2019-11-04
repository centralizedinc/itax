'use strict'
var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');

function validate(form_details) {
    //validation begins ...
    var errors = [];

    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));
    console.log('done validating taxpayer...');

    // validate required fields
    errors.push(...validateRequired(form_details));
    console.log('done validating required fields...');

    // checking due date if late filing
    // var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 2);
    // errors.push(...error_messages);
    console.log('done checking due date...');

    return { errors, form_details }
}

function validateRequired(form) {
    var error_messages = [];
    console.log('Validating required fields ...');

    if (!form.category_of_agent) {
        error_messages.push({ page: 1, field: "category_of_agent", error: constant_helper.MANDATORY_FIELD('Category of Agent') });
    } else if (form.category_of_agent === 'private' && (form.top_withholding_agent === null || form.top_withholding_agent === undefined)) {
        error_messages.push({ page: 1, field: "top_withholding_agent", error: "If private, choose Yes or No." });
    }

    if (!form.taxpayer || !form.taxpayer.contact_details || !form.taxpayer.contact_details.email) {
        error_messages.push({ page: 1, field: "taxpayer.contact_details.email", error: constant_helper.MANDATORY_FIELD("Email Address") });
    }

    if (form.is_refund_released === null || form.is_refund_released === undefined) {
        error_messages.push({ page: 1, field: "is_refund_released", error: "Please choose Yes or No." });
    } else if (form.is_refund_released) {
        if (!form.date_of_refund) {
            error_messages.push({ page: 1, field: "date_of_refund", error: constant_helper.MANDATORY_FIELD("Date of refund") });
        } else if (new Date(form.date_of_refund).getFullYear() < new Date(form.return_period_year).getFullYear()) {
            error_messages.push({ page: 1, field: "date_of_refund", error: `Date of refund should not be less than the filing year. ${new Date(form.return_period_year).getFullYear()}` });
        }

        if (!form.total_overremittance_amount) {
            error_messages.push({ page: 1, field: "total_overremittance_amount", error: constant_helper.MANDATORY_FIELD("Total Amount of Overremittance") });
        }

        if (!form.overremittance_first_crediting_month) {
            error_messages.push({ page: 1, field: "overremittance_first_crediting_month", error: constant_helper.MANDATORY_FIELD("Month of First Crediting of Overremittance") });
        }
    }

    return error_messages;
}

module.exports = {
    validate
}