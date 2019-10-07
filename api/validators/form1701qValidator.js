'use strict'

var Form1701QModel = require('../models/forms/form1701QModel.js');
var commonValidator = require('./commonValidator.js');


/**
 * 
 * @param {*} form_details 
 * @returns [Array] errors
 */
function validate(form_details) {

    //validation begins ...
    var errors = [];

    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer)) 

    //latefiling computations
    console.log('form 1701q validator errors: ', JSON.stringify(errors) )

    return errors
}

// function validateYear(year) {
//     var error_messages = [];
//     // var tp = new taxpayerDetails(taxpayer);
//     console.log('tp', JSON.stringify(year))
//     console.log('!tp.tin', !year.dateFiled)
//     if (!year.dateFiled) {
//         error_messages.push({ field: "dateFiled", name: "Year", error: "Year is a mandatory field" });
//     }

//     if (!year.quarter) {
//         error_messages.push({ field: "quarter", name: "Quarter", error: "Quarter is a mandatory field" });
//     }

//     if (!year.amendedYn) {
//         error_messages.push({ field: "taxpayer.rdo_code", error: "RDO Code is a mandatory field" });
//     }

//     return error_messages;

// }

function validateRequired(field) {
    var error_messages = [];
        var tp = new taxpayerDetails(taxpayer); 
        console.log('tp', JSON.stringify(field))
        console.log('!tp.tin', !field.dateFiled)
        if (!field.dateFiled) {
            error_messages.push({ field: "dateFiled", name: "Year", error: "Year is a mandatory field" });
        }
    
        if (!field.quarter) {
            error_messages.push({ field: "quarter", name: "Quarter", error: "Quarter is a mandatory field" });
        }
    
        if (!field.tax_filer_type) {
            error_messages.push({ field: "taxpayer.tax_filer_type", error: "Tax payer type is a mandatory field" });
        }

        if (!field.taxpayer.atc) {
            error_messages.push({ field: "atc", error: "ATC is a mandatory field" });
        }
    
        if (!field.tax_filer_type) {
            error_messages.push({ field: "taxpayer.tax_filer_type", error: "Tax payer type is a mandatory field" });
        }

        if (!field.taxpayer.tax_filer_type) {
            error_messages.push({ field: "taxpayer.tax_filer_type", error: "Tax payer type is a mandatory field" });
        }

        if (!field.taxpayer.citizenship) {
            error_messages.push({ field: "taxpayer.citizenship", error: "Citizenship is a mandatory field" });
        }

        if (!field.taxCredits) {
            error_messages.push({ field: "taxCredits", error: "Claiming Foreign Tax Credits is a mandatory field" });
        }
        
        if (!field.method_deduction) {
            error_messages.push({ field: "method_deduction", error: "Method of deduction is a mandatory field" });
        }
        return error_messages;
}


function computeDueDate(returnPeriod) {
    var due_date = new Date();

    var month = returnPeriod.getMonth() + 1;

    //every 20th of the next month
    due_date.setDate(20);
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