'use strict'
var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');

function validate(form_details) {
    //validation begins ...
    var errors = [];

    //validate taxpayer
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));
    console.log('done validating taxpayer...');

    // validate required fields
    errors.push(...validateRequired(form_details));
    console.log('done required fields...');

    // check due date if late filing
    var {
        error_messages,
        form_details
    } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);
    console.log('done checking due date...');

    return {
        errors,
        form_details
    }
}

function validateRequired(form) {
    var error_messages = [];
    console.log('Validating required fields...');

    if (!form.community_tax_certificate) {
        error_messages.push({
            page: 1,
            field: "community_tax_certificate",
            error: constant_helper.MANDATORY_FIELD("Please indicate the Community Tax Certificate Number on Item 29")
        });
    }

    if (!form.place_issue) {
        error_messages.push({
            page: 1,
            field: "place_issue",
            error: constant_helper.MANDATORY_FIELD("Please indicate the place where the Community Tax Certificate was issued on Item 30")
        });
    }

    if (!form.date_issue) {
        error_messages.push({
            page: 1,
            field: "date_issue",
            error: constant_helper.MANDATORY_FIELD("Please indicate date the Community Tax Certificate was issued on Item 31")
        });
    }

    if (!form.part2_amount) {
        error_messages.push({
            page: 1,
            field: "part2_amount",
            error: constant_helper.MANDATORY_FIELD("Please indicate the Community Tax Due on Item 32")
        });
    }

    return error_messages;
}

module.exports = {
    validate
}