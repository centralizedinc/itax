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
    if (!form.taxpayer || !form.taxpayer.atc_code) {
        error_messages.push({ page: 0, field: "taxpayer.atc_code", error: constant_helper.MANDATORY_FIELD('ATC') });
    }
    if (!form.taxpayer || !form.taxpayer.legal_basis) {
        error_messages.push({ page: 1, field: "taxpayer.legal_basis", error: constant_helper.MANDATORY_FIELD('Legal basis of tax relief/exemption') });
    }
    if (!form.taxpayer || !form.taxpayer.agency) {
        error_messages.push({ page: 1, field: "taxpayer.agency", error: constant_helper.MANDATORY_FIELD('Investment promotion Agency (IPA)/Government agency') });
    }
    if (!form.taxpayer || !form.taxpayer.effective_date_from) {
        error_messages.push({ page: 1, field: "taxpayer.effective_date_from", error: constant_helper.MANDATORY_FIELD('Effective date from') });
    }
    if (!form.taxpayer || !form.taxpayer.effective_date_to) {
        error_messages.push({ page: 1, field: "taxpayer.effective_date_to", error: constant_helper.MANDATORY_FIELD('Effective date to') });
    }

    if (!form.part5_total_deductions) {
        error_messages.push({ page: 1, field: "part5_total_deductions", error: 'Schedule 1 item 18 must be greater than zero' });
    } 

    if (form.net_taxable_income !== form.net_income) {
    // if (form.sched3.net_taxable_income !== form.net_income) {
    // if (!form.sched3.net_taxable_income) {
        // form.sched3.net_taxable_income !== form.sched3.net_taxable_income ? form.sched3.net_taxable_income.toFixed(2) : "0.00";
        error_messages.push({ page: 2, field: "net_taxable_income", error: 'Net taxable income (loss) on Schedule3 Item 10 must be equal to Part IV Item 38' });
    }
    // Net taxable income (loss) on Item 10, shedule 6, Page 5 must be equal to Net Taxable income on Item 39, Part IV, Page 2



    return error_messages;
}

module.exports = {
    validate
}