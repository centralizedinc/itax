'use strict'
/**
 * 
 * @description FORM 1702EX  VALIDATOR(JANUARY 2018)
 * @author Kris
 * @base_form https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1702-EX%20Jan%202018%20ENCS%20Final%20v3.pdf
 * @version 1.0 - 10/24/2019
 * 
 */

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
    // if (!form.taxpayer || !form.taxpayer.line_of_business) {
    //     error_messages.push({ page: 1, field: "taxpayer.line_of_business", error: constant_helper.MANDATORY_FIELD('Line of Business') });
    // }
    // else if(form.is_avail_tax_relief) {
    //     if (!form.avail_tax_relief || !form.avail_tax_relief.length) {
    //         error_messages.push({ page: 1, field: "avail_tax_relief", error: constant_helper.MANDATORY_FIELD('Specify tax relief under special law or international tax treaty') });
    //     }
    // }
    if (!form.taxpayer || !form.taxpayer.atc_code) {
        error_messages.push({ page: 1, field: "taxpayer.atc_code", error: constant_helper.MANDATORY_FIELD('ATC') });
    }
    if (!form.taxpayer || !form.taxpayer.legal_basis) {
        error_messages.push({ page: 1, field: "taxpayer.legal_basis", error: constant_helper.MANDATORY_FIELD('Legal basis of tax relief/exemption') });
    }
    if (!form.taxpayer || !form,taxpayer.agency) {
        error_messages.push({ page: 1, field: "taxpayer.agency", error: constant_helper.MANDATORY_FIELD('Investment promotion Agency (IPA)/Government agency') });
    }
    if (!form.taxpayer || !form,taxpayer.effective_date_from) {
        error_messages.push({ page: 1, field: "taxpayer.effective_date_from", error: constant_helper.MANDATORY_FIELD('Effective date from') });
    }
    if (!form.taxpayer || !form,taxpayer.effective_date_to) {
        error_messages.push({ page: 1, field: "taxpayer.effective_date_to", error: constant_helper.MANDATORY_FIELD('Effective date to') });
    }
    // atc //
    //tax relief exemption item 16 //
    //investment promotion agency item 17 //
    //registered activity program item 18 //
    //effective of date tax relief item 19 // 17
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