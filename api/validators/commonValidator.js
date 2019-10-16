'use strict'

var taxpayerDetails = require('../models/taxpayerDetailsModel.js');

const constant_helper = require('../utils/constant_helper');

function validateTaxpayerDetails(tp, page) {
    var error_messages = [];
    // var tp = new taxpayerDetails(taxpayer);
    console.log('page :', page);
    console.log('tp', JSON.stringify(tp))

    if (!tp || !tp.tin) {
        error_messages.push({ page, field: "taxpayer.tin", error: constant_helper.MANDATORY_FIELD('TIN') });
    }

    if (!tp || !tp.rdo_code) {
        error_messages.push({ page, field: "taxpayer.rdo_code", error: constant_helper.MANDATORY_FIELD('RDO Code') });
    }

    if (!tp || !tp.registered_name) {
        error_messages.push({ page, field: "taxpayer.registered_name", error: constant_helper.MANDATORY_FIELD('Registered Name') });
    }

    if (!tp || !tp.contact_details || !tp.contact_details.telno) {
        error_messages.push({ page, field: "taxpayer.contact_details.telno", error: constant_helper.MANDATORY_FIELD('Telephone no') });
    }
    if (!tp || !tp.address) {
        error_messages.push({ page, field: "taxpayer.address", error: constant_helper.MANDATORY_FIELD('Registered Address') });
    }

    if (!tp || !tp.address_details || !tp.address_details.zipCode) {
        error_messages.push({ page, field: "taxpayer.address_details.zipCode", error: constant_helper.MANDATORY_FIELD('Zip Code') });
    }

    return error_messages;

}

function isFutureDate(idate) {
    var today = new Date().getTime(),
        idate = idate.split("/");

    idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
    return (today - idate) < 0 ? true : false;
}

/**
 * 
 * @param {Date} due_date 
 */
function isLateFiling(due_date) {
    console.log("Due date :", due_date);
    return new Date().getTime() > new Date(due_date).getTime();
}

function computeSurcharges(amount) {
    var surcharge = 0;

    if (amount > 0.0) {
        surcharge = amount * 0.25;
    } else {
        surcharge = 0.0;
    }

    if (amount < 0.0) {
        amount = 0.0;
    }

    return surcharge;
}

/**
 * 
 * @param {Date} due_date 
 * @param {Number} amount 
 */
function computeInterest(due_date, amount) {
    var interest = 0;
    var dayDifference = 0;

    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = due_date;
    var secondDate = new Date();

    if (!amount || amount <= 0) {
        interest = 0;
    } else {
        dayDifference = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        interest = (amount * 20 / 100 * dayDifference) / 365;
    }

    return interest;
}

function computeCompromise() {
    return 0;
}

function validateMandatory(value, message) {

}

function formatAmount(amount) {
    if (!amount || isNaN(amount)) return "0.00";
    var parts = parseFloat(amount).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function checkDueDate(form_details, page) {
    var error_messages = [];
    if (isLateFiling(form_details.due_date)) {
        console.log('Late filling ... ', page);
        // Compute Surcharge
        const surcharge = computeSurcharges(form_details.tax_due);
        form_details.surcharge = form_details.surcharge ? form_details.surcharge.toFixed(2) : "0.00";
        console.log('Surcharge :', surcharge, ':', form_details.surcharge);
        if (form_details.surcharge !== surcharge.toFixed(2)) {
            error_messages.push({
                page,
                field: 'surcharge',
                error: `Surcharge amount must be ${formatAmount(surcharge)}`,
                required_value: surcharge.toFixed(2)
            })
        }
        // Compute Interest
        const interest = computeInterest(form_details.due_date, form_details.tax_due);
        form_details.interest = form_details.interest ? form_details.interest.toFixed(2) : "0.00";
        console.log('Interest :', interest, ':', form_details.interest);
        if (form_details.interest !== interest.toFixed(2)) {
            error_messages.push({
                page,
                field: 'interest',
                error: `Interest amount must be ${formatAmount(interest)}`,
                required_value: interest.toFixed(2)
            })
        }
        // Compute Compromise
        const compromise = computeCompromise(form_details.due_date, form_details.tax_due);
        form_details.compromise = form_details.compromise ? form_details.compromise.toFixed(2) : "0.00";
        console.log('Compromise :', compromise, ':', form_details.compromise);
        if (form_details.compromise !== compromise.toFixed(2)) {
            error_messages.push({
                page,
                field: 'compromise',
                error: `Compromise amount must be ${formatAmount(compromise)}`,
                required_value: compromise.toFixed(2)
            })
        }
    }
    return { error_messages, form_details };
}

function validateReturnPeriodByQuarter(year, quarter, page) {
    var errors = [];
    console.log('year :', year);
    if (!year) {
        errors.push({ page, field: "return_period_year", error: constant_helper.MANDATORY_FIELD('For the year') });
    }
    if (!quarter) {
        errors.push({ page, field: "quarter", error: constant_helper.MANDATORY_FIELD('Quarter') });
    }

    if (errors.length) return { errors };

    var quarterly = [2, 5, 8, 11];
    var return_period = new Date(year, quarterly[quarter] + 1, 0);
    return { errors: null, return_period };
}

function validateReturnPeriodByMonthYear(year, month, page) {
    var errors = [];
    if (!year || !month) {
        errors.push({ page, field: "return_period", error: constant_helper.MANDATORY_FIELD('Return Period') });
        return { errors };
    }

    var return_period = new Date(year, month + 1, 0);
    return { errors, return_period };
}

module.exports = {
    isFutureDate,
    validateTaxpayerDetails,
    isLateFiling,
    computeSurcharges,
    computeInterest,
    computeCompromise,
    validateMandatory,
    formatAmount,
    checkDueDate,
    validateReturnPeriodByMonthYear,
    validateReturnPeriodByQuarter
}
