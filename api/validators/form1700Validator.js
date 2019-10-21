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
    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);
    console.log('done checking due date...');

    return { errors, form_details }
}

function validateRequired(form) {
    var error_messages = [];
    console.log('Validating required fields ...');    
    if (!form.taxpayer || !form.taxpayer.taxpayer_type) {
        error_messages.push({ page: 1, field: "taxpayer.taxpayer_type", error: constant_helper.MANDATORY_FIELD("Taxpayer's Taxpayer type") });
    }

    if (!form.taxpayer || !form.taxpayer.individual_details || !form.taxpayer.individual_details.birthDate) {
        error_messages.push({ page: 1, field: "taxpayer.individual_details.birthDate", error: constant_helper.MANDATORY_FIELD("Taxpayer's Date of Birth") });
    }

    if (!form.taxpayer || !form.taxpayer.contact_details || !form.taxpayer.contact_details.email) {
        error_messages.push({ page: 1, field: "taxpayer.contact_details.email", error: constant_helper.MANDATORY_FIELD("Taxpayer's Email") });
    }

    if (!form.taxpayer || !form.taxpayer.individual_details || !form.taxpayer.individual_details.citizenship) {
        error_messages.push({ page: 1, field: "taxpayer.individual_details.citizenship", error: constant_helper.MANDATORY_FIELD("Taxpayer's Citizenship") });
    }

    if (!form.taxpayer || !form.taxpayer.contact_details || !form.taxpayer.contact_details.mobile) {
        error_messages.push({ page: 1, field: "taxpayer.contact_details.mobile", error: constant_helper.MANDATORY_FIELD("Taxpayer's Contact Number") });
    }

    if (!form.taxpayer || !form.taxpayer.individual_details || !form.taxpayer.individual_details.civil_status) {
        error_messages.push({ page: 1, field: "taxpayer.individual_details.civil_status", error: constant_helper.MANDATORY_FIELD("Taxpayer's Civil Status") });
    } else if(form.taxpayer.individual_details.civil_status === 'm'){
        // Required spouse details
        // if(form.spouse_has_income === null || form.spouse_has_income === undefined){ //item 16
        //     error_messages.push({ page: 1, field: "form.spouse_has_income", error: "Please select if Yes or No." });
        // } else if(form.spouse_has_income) {
        //     if(!form.filing_status){ //item 17
        //         error_messages.push({ page: 1, field: "form.filing_status", error: constant_helper.MANDATORY_FIELD("Filing Status") });
        //     }
        // }

        if (!form.spouse_details || !form.spouse_details.tin) {
            error_messages.push({ page: 2, field: "spouse_details.tin", error: constant_helper.MANDATORY_FIELD("Spouse's TIN") });
        }

        if (!form.spouse_details || !form.spouse_details.rdo_code) {
            error_messages.push({ page: 2, field: "spouse_details.rdo_code", error: constant_helper.MANDATORY_FIELD("Spouse's Rdo Code") });
        }

        if (!form.spouse_details || !form.spouse_details.taxpayer_type) {
            error_messages.push({ page: 2, field: "spouse_details.taxpayer_type", error: constant_helper.MANDATORY_FIELD("Spouse's Taxpayer type") });
        }

        if (!form.spouse_details || !form.spouse_details.registered_name) {
            error_messages.push({ page: 2, field: "spouse_details.registered_name", error: constant_helper.MANDATORY_FIELD("Spouse's Name") });
        }

        if (!form.spouse_details || !form.spouse_details.contact_details || !form.spouse_details.contact_details.mobile) {
            error_messages.push({ page: 2, field: "spouse_details.contact_details.mobile", error: constant_helper.MANDATORY_FIELD("Spouse's Contact Number") });
        }

        if (!form.spouse_details || !form.spouse_details.individual_details || !form.spouse_details.individual_details.citizenship) {
            error_messages.push({ page: 2, field: "spouse_details.individual_details.citizenship", error: constant_helper.MANDATORY_FIELD("Spouse's Citizenship") });
        }
    }

    if(!form.sched1 || !form.sched1.length){
        error_messages.push({ page: 2, field: "form.sched1", error: "Please fill up atleast one in Schedule 1" });
    } else {
        if(!form.sched1[0].filer_type){
            error_messages.push({ page: 2, field: "form.sched1", error: constant_helper.MANDATORY_FIELD("Filer type in Schedule 1") });
        }

        if(!form.sched1[0].name_of_employer){
            error_messages.push({ page: 2, field: "form.sched1", error: constant_helper.MANDATORY_FIELD("Name of Employer in Schedule 1") });
        }

        if(!form.sched1[0].employer_tin){
            error_messages.push({ page: 2, field: "form.sched1", error: constant_helper.MANDATORY_FIELD("Employer's TIN in Schedule 1") });
        }

        if(!form.sched1[0].compensation_income_grad){
            error_messages.push({ page: 2, field: "form.sched1", error: constant_helper.MANDATORY_FIELD("Compensation Income Subject to Regular/Graduated Rates") });
        }

        if(!form.sched1[0].compensation_income_flat){
            error_messages.push({ page: 2, field: "form.sched1", error: constant_helper.MANDATORY_FIELD("Compensation Income Subject to 25% Flat Rate") });
        }

        if(!form.sched1[0].tax_withheld){
            error_messages.push({ page: 2, field: "form.sched1", error: constant_helper.MANDATORY_FIELD("Tax Withheld") });
        }
    }
    return error_messages;
}

module.exports = {
    validate
}