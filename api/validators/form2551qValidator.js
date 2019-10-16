'use strict'
var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');

function validate(form_details) {
    console.log("validation form details(2551q): " + JSON.stringify(form_details))
    //validation begins ...
    var errors = [];

    const validated_return = commonValidator.validateReturnPeriodByQuarter(form_details.return_period_year, form_details.quarter, 0);
    if (validated_return.errors && validated_return.errors.length) return { errors: validated_return.errors };
    else form_details.return_period = validated_return.return_period;
    console.log('form 2551q return period :', form_details.return_period);


    form_details.due_date = computeDueDate(form_details.return_period)
    console.log('form 2551q due date :', form_details.due_date);

    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));

    // validate required fields
    errors.push(...validateRequired(form_details));
    //latefiling computations
    // 25% total amount due
    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);

    console.log('form 2551q validator errors: ', JSON.stringify(errors));

    return { errors: [], form_details }
}

function computeDuedate(params) {
    
}

module.exports = {
    validate
}