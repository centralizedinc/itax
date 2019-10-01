'use strict'

var Form2000OTModel = require('../models/forms/form2000OTModel');
var commonValidator = require('./commonValidator.js');


/**
 * 
 * @param {*} form_details 
 * @param {*} callback 
 */
function validate(form_details, callback) {

    //validation begins ...
    var error_messages = {};

    console.log("FORMS: " + JSON.stringify(form_details));

    var success_flag = false;

    // Validation
    if (form_details.natureOfTransaction === "") {
        error_messages.natureOfTransaction = [];
        error_messages.natureOfTransaction.push("Nature of Transaction is a mandatory field");
    }
    if (form_details.propertySold === "realProperty") {
        if (form_details.realPropertyClass === "") {
            error_messages.realPropertyClass = [];
            error_messages.realPropertyClass.push("Classification of Real Property is a mandatory field");
        }
    } else if (form_details.propertySold === "sharesStocks") {
        // Nothing will happen
    }

    error_messages = Object.assign({}, error_messages, validateComputations(form_details));

    if (!error_messages.length) {
        success_flag = true;
    }

    console.log("############ error_messages: " + error_messages.length);

    callback({
        success: success_flag,
        errors: error_messages
    });
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
 * @param {form2000OTModel} form 
 */
function validateComputations(form) {
    var error_messages = {};

    // schedule
    var totalA1B1 = 0;
    var totalA2B2 = 0;
    var totalA1B2 = 0;
    var totalA2B1 = 0;
    var totalSchedule1 = 0;

    var totalRealProperty = 0;
    var totalSharesStock = 0;
    var totalTaxDue = 0;
    var totalTaxStillDue = 0;

    var surcharge = 0;
    var interest = 0;
    var compromise = 0;
    var totalPenalties = 0;
    var totalAmountPayable = 0;

    totalA1B1 =
        parseFloat(form.schedule1.commissionerLand) +
        parseFloat(form.schedule1.commissionerImprovement);
    if (form.schedule1.commissionerTotal !== totalA1B1) {
        error_messages.commissionerTotal = [];
        error_messages.commissionerTotal.push(totalA1B1)
    }

    totalA2B2 =
        parseFloat(form.schedule1.provincialLand) +
        parseFloat(form.schedule1.provincialImprovement);
    if (form.schedule1.provincialTotal !== totalA2B2) {
        error_messages.provincialTotal = [];
        error_messages.provincialTotal.push(totalA2B2)
    }

    totalA1B2 =
        parseFloat(form.schedule1.commissionerLand) +
        parseFloat(form.schedule1.provincialImprovement);
    if (form.schedule1.sum1A2B !== totalA1B2) {
        error_messages.sum1A2B = [];
        error_messages.sum1A2B.push(totalA1B2)
    }

    totalA2B1 =
        parseFloat(form.schedule1.provincialLand) +
        parseFloat(form.schedule1.commissionerImprovement);
    if (form.schedule1.sum1B2A !== totalA2B1) {
        error_messages.sum1B2A = [];
        error_messages.sum1B2A.push(totalA2B1)
    }

    totalSchedule1 = Math.max(totalA1B1, totalA2B2, totalA1B2, totalA2B1);
    if (form.schedule1.fairMarketValue !== totalSchedule1) {
        error_messages.fairMarketValue = [];
        error_messages.fairMarketValue.push(totalSchedule1)
    }

    var sellingPrice = form.sellingPrice === undefined ||
        form.sellingPrice === ""
        ? 0
        : form.sellingPrice;

    var fairMarketValue = form.fairMarketValue === undefined ||
        form.fairMarketValue === ""
        ? 0
        : form.fairMarketValue;


    totalRealProperty = Math.max(parseFloat(sellingPrice), parseFloat(fairMarketValue));
    if (form.realPropertyTaxBase !== totalRealProperty) {
        error_messages.realPropertyTaxBase = [];
        error_messages.realPropertyTaxBase.push(totalRealProperty)
    }

    var parValueShares = form.parValueShares === undefined ||
        form.parValueShares === ""
        ? 0
        : form.parValueShares;

    var dstPaid = form.dstPaid === undefined ||
        form.dstPaid === ""
        ? 0
        : form.dstPaid;


    totalSharesStock = Math.max(parseFloat(parValueShares), parseFloat(dstPaid));
    if (form.sharesStockTaxBase !== totalSharesStock) {
        error_messages.sharesStockTaxBase = [];
        error_messages.sharesStockTaxBase.push(totalSharesStock)
    }

    var selectedTaxRate = 0;
    var rate = form.atc.rate.replace("P", "");
    if (form.atc.code === "DS125") {
        selectedTaxRate = parseFloat(rate) / 100;
    } else {
        var dividend = rate.split("/")[0];
        var divisor = rate.split("/")[1];
        selectedTaxRate = parseFloat(dividend) / parseFloat(divisor);
    }

    if (form.propertySold === "realProperty") {
        totalTaxDue = parseFloat(totalRealProperty) * parseFloat(selectedTaxRate);
    } else if (form.propertySold === "sharesStocks") {
        totalTaxDue = parseFloat(totalSharesStock) * parseFloat(selectedTaxRate);
    }
    if (form.taxDue !== totalTaxDue) {
        error_messages.taxDue = [];
        error_messages.taxDue.push(totalTaxDue)
    }

    var prevTaxPaid = 0;
    if (form.amendedYn === 'Y') {
        prevTaxPaid = form.prevTaxPaid === undefined ||
            form.prevTaxPaid === ""
            ? 0
            : form.prevTaxPaid;
    }
    totalTaxStillDue = parseFloat(totalTaxDue) - parseFloat(prevTaxPaid);
    if (form.taxStillDue !== totalTaxStillDue) {
        error_messages.taxStillDue = [];
        error_messages.taxStillDue.push(totalTaxStillDue)
    }

    if (isLateFilling) {
        surcharge = computeSurcharge(totalTaxStillDue);
        if (form.surcharge !== surcharge) {
            error_messages.surcharge = [];
            error_messages.surcharge.push(surcharge)
        }

        interest = computeInterest(totalTaxStillDue);
        if (form.interest !== interest) {
            error_messages.interest = [];
            error_messages.interest.push(interest)
        }

        compromise = computeCompromise(totalTaxStillDue);
        if (form.compromise !== compromise) {
            error_messages.compromise = [];
            error_messages.compromise.push(compromise)
        }
    }
    totalPenalties = surcharge + interest + compromise;
    if (form.penalties !== totalPenalties) {
        error_messages.penalties = [];
        error_messages.penalties.push(totalPenalties)
    }

    totalAmountPayable = totalTaxStillDue + totalPenalties;
    if (form.totalAmountPayable !== totalAmountPayable) {
        error_messages.totalAmountPayable = [];
        error_messages.totalAmountPayable.push(totalAmountPayable)
    }


    return error_messages;
}


module.exports = {
    validate
}