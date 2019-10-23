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
    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);
    console.log('done checking due date...');

    return { errors, form_details }
}

function validateRequired(form) {
    var error_messages = [];
    console.log('Validating required fields...');
    if (!form.taxpayer || !form.taxpayer.line_of_business) {
        error_messages.push({ page: 1, field: "taxpayer.line_of_business", error: constant_helper.MANDATORY_FIELD('Line of Business') });
    }
    else if(form.is_avail_tax_relief) {
        if (!form.avail_tax_relief || !form.avail_tax_relief.length) {
            error_messages.push({ page: 1, field: "avail_tax_relief", error: constant_helper.MANDATORY_FIELD('Specify tax relief under special law or international tax treaty') });
        }
    }

    // atc
    //tax relief exemption item 16
    //investment promotion agency item 17
    //registered activity program item 18
    //effective of date tax relief item 19
    //ctc or serc Item 23
    //date issued Item 24
    //indicate issue Item 25
    //amount CTC Item 26
    //total allowable itemized deduction Item 40 schedule 4 page 5
    //Net taxable income Item 10 sched 6 page 5 must be equal to Net taxable income on Item 39 page 2 part IV
    //Net taxable income Item 10 sched 6 page 5 must be equal to income on item 39 part IV page 2
    //

    return error_messages;
}

module.exports = {
    validate
}