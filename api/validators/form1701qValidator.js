'use strict'

var Form1701QModel = require('../models/forms/form1701QModel.js');
var commonValidator = require('./commonValidator.js');

const constant_helper = require('../utils/constant_helper');
/**
 * 
 * @param {*} form_details 
 * @returns [Array] errors
 */
function validate(form_details) {

    //validation begins ...
    var errors = [];
    form_details.due_date = computeDueDate(form_details.returnPeriod)
    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer)) 
    // validate required fields
    errors.push(...validateRequired(form_details));

    // LATE FILING

    // if (commonValidator.isLateFiling(form_details.due_date)) {
    //     // Compute Surcharge
    //     const surcharge = commonValidator.computeSurcharges(form_details.amtPaybl);
    //     if (form_details.surcharge !== surcharge) {
    //         errors.push({
    //             field: 'surcharge',
    //             error: `Surcharge amount must be ${surcharge}`
    //         })
    //     }
    //     // Compute Interest
    //     const interest = commonValidator.computeInterest(form_details.due_date, form_details.amtPaybl);
    //     if (form_details.interest !== interest) {
    //         errors.push({
    //             field: 'interest',
    //             error: `Interest amount must be ${interest}`
    //         })
    //     }
    //     // Compute Compromise
    //     const compromise = commonValidator.computeCompromise(form_details.due_date, form_details.amtPaybl);
    //     if (form_details.compromise !== compromise) {
    //         errors.push({
    //             field: 'compromise',
    //             error: `Compromise amount must be ${compromise}`
    //         })
    //     }
    // }

//latefiling computations
console.log('form 1701q validator errors: ', JSON.stringify(errors) )

    return errors
}

function validateRequired(field) {
    var error_messages = [];
        var tp = new taxpayerDetails(taxpayer); 
        console.log('tp', JSON.stringify(field))
        console.log('!tp.tin', !field.dateFiled)
        if (!field.dateFiled) {
            error_messages.push({ field: "dateFiled", name: "Year", error: constant_helper.MANDATORY_FIELD("Year") });
        }
    
        if (!field.quarter) {
            error_messages.push({ field: "quarter", name: "Quarter", error: constant_helper.MANDATORY_FIELD("Quarter") });
        }
    
        if (!field.tax_filer_type) {
            error_messages.push({ field: "taxpayer.tax_filer_type", error: constant_helper.MANDATORY_FIELD("Tax payer type") });
        }

        if (!field.taxpayer.atc) {
            error_messages.push({ field: "atc", error: constant_helper.MANDATORY_FIELD("ATC") });
        }
    
        // if (!field.tax_filer_type) {
        //     error_messages.push({ field: "taxpayer.tax_filer_type", error: constant_helper.MANDATORY_FIELD("Tax payer type") });
        // }

        if (!field.taxpayer.tax_filer_type) {
            error_messages.push({ field: "taxpayer.tax_filer_type", error: constant_helper.MANDATORY_FIELD("Tax payer type") });
        }

        if (!field.taxpayer.citizenship) {
            error_messages.push({ field: "taxpayer.citizenship", error: constant_helper.MANDATORY_FIELD("Citizenship") });
        }

        if (!field.taxCredits) {
            error_messages.push({ field: "taxCredits", error: constant_helper.MANDATORY_FIELD("Claiming Foreign Tax Credits") });
        }
        
        if (!field.method_deduction) {
            error_messages.push({ field: "method_deduction", error: constant_helper.MANDATORY_FIELD("Method of deduction") });
        }
        return error_messages;
}


function computeDueDate(returnPeriod) {
    console.log("computeDueDate data: " + returnPeriod)
    var due_date = new Date();

    var month = returnPeriod.getMonth() + 3;
    // every 15th of the quarter May 15, Aug 15, Nov 15
    due_date.setDate(15);
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
        item17F = 0,
        item18A = 0,
        item18B = 0,
        item18C = 0,
        item18D = 0,
        item18P = 0,
        item19 = 0,
        item20A = 0,
        item20B = 0,
        item20C = 0,
        item20F = 0,
        item21 = 0,
        item22 = 0,
        item23A = 0,
        item23B = 0,
        item23C = 0,
        item23G = 0,
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