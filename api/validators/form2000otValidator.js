'use strict'

var commonValidator = require('./commonValidator.js');

// utils
const constant_helper = require('../utils/constant_helper');

/**
 * @returns {Object} errors, due_date
 * @param {*} form_details 
 */
function validate(form_details) {
    console.log("validation form details(2000ot): " + JSON.stringify(form_details))
    //validation begins ...
    var errors = [];

    if (!form_details.returnPeriod) {
        errors.push({
            page: 0,
            field: "returnPeriod",
            error: constant_helper.MANDATORY_FIELD('Date of Transaction')
        });
        return { errors };
    }

    form_details.due_date = computeDueDate(form_details.returnPeriod);
    console.log('form 2000ot due date :', form_details.due_date);

    // validate Taxpayer
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));

    //validate required fields
    errors.push(...validateRequired(form_details));

    if (commonValidator.isLateFiling(form_details.due_date)) {
        console.log('Late filling ...');
        // Compute Surcharge
        const surcharge = commonValidator.computeSurcharges(form_details.taxStillDue);
        form_details.surcharge = form_details.surcharge ? form_details.surcharge : 0;
        console.log('Surcharge :', surcharge, ':', form_details.surcharge);
        if (commonValidator.formatAmount(form_details.surcharge) !== commonValidator.formatAmount(surcharge)) {
            errors.push({
                page: 3,
                field: 'surcharge',
                error: `Surcharge amount must be ${commonValidator.formatAmount(surcharge)}`
            })
        }
        // Compute Interest
        const interest = commonValidator.computeInterest(form_details.due_date, form_details.taxStillDue);
        form_details.interest = form_details.interest ? form_details.interest : 0;
        console.log('Interest :', interest, ':', form_details.interest);
        if (commonValidator.formatAmount(form_details.interest) !== commonValidator.formatAmount(interest)) {
            errors.push({
                page: 3,
                field: 'interest',
                error: `Interest amount must be ${commonValidator.formatAmount(interest)}`
            })
        }
        // Compute Compromise
        const compromise = commonValidator.computeCompromise(form_details.due_date, form_details.taxStillDue);
        form_details.compromise = form_details.compromise ? form_details.compromise : 0;
        console.log('Compromise :', compromise, ':', form_details.compromise);
        if (commonValidator.formatAmount(form_details.compromise) !== commonValidator.formatAmount(compromise)) {
            errors.push({
                page: 3,
                field: 'compromise',
                error: `Compromise amount must be ${commonValidator.formatAmount(compromise)}`
            })
        }
    }

    console.log('form 2000ot validator errors: ', JSON.stringify(errors))

    return { errors, due_date: form_details.due_date }
}

function validateRequired(form) {
    var error_messages = [];

    if (!form.natureOfTransaction) {
        error_messages.push({
            page: 2,
            field: "natureOfTransaction",
            error: constant_helper.MANDATORY_FIELD('Nature of Transaction')
        });
    } else if (form.natureOfTransaction === 'real_property_capital' ||
        form.natureOfTransaction === 'real_property_ordinary') {
        if (!form.realPropertyClass) {
            error_messages.push({
                page: 2,
                field: "realPropertyClass",
                error: constant_helper.MANDATORY_FIELD('Classification of Real Property')
            });
        }
    }

    return error_messages;
}

function computeDueDate(returnPeriod) {
    var return_period = new Date(returnPeriod);
    var lastDate = return_period.getMonth() + 1;
    lastDate = lastDate - 5;
    const due_date = new Date(return_period.getFullYear(), lastDate, return_period.getMonth());
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
        form.sellingPrice === "" ?
        0 :
        form.sellingPrice;

    var fairMarketValue = form.fairMarketValue === undefined ||
        form.fairMarketValue === "" ?
        0 :
        form.fairMarketValue;


    totalRealProperty = Math.max(parseFloat(sellingPrice), parseFloat(fairMarketValue));
    if (form.realPropertyTaxBase !== totalRealProperty) {
        error_messages.realPropertyTaxBase = [];
        error_messages.realPropertyTaxBase.push(totalRealProperty)
    }

    var parValueShares = form.parValueShares === undefined ||
        form.parValueShares === "" ?
        0 :
        form.parValueShares;

    var dstPaid = form.dstPaid === undefined ||
        form.dstPaid === "" ?
        0 :
        form.dstPaid;


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
            form.prevTaxPaid === "" ?
            0 :
            form.prevTaxPaid;
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