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

function checkDueDate(form_details, page){
    var errors = [];
    if (isLateFiling(form_details.due_date)) {
        console.log('Late filling ... ', page);
        // Compute Surcharge
        const surcharge = computeSurcharges(form_details.tax_due);
        form_details.surcharge = form_details.surcharge ? form_details.surcharge : 0;
        console.log('Surcharge :', surcharge, ':', form_details.surcharge);
        if (formatAmount(form_details.surcharge) !== formatAmount(surcharge)) {
            errors.push({
                page,
                field: 'surcharge',
                error: `Surcharge amount must be ${formatAmount(surcharge)}`
            })
        }
        // Compute Interest
        const interest = computeInterest(form_details.due_date, form_details.tax_due);
        form_details.interest = form_details.interest ? form_details.interest : 0;
        console.log('Interest :', interest, ':', form_details.interest);
        if (formatAmount(form_details.interest) !== formatAmount(interest)) {
            errors.push({
                page,
                field: 'interest',
                error: `Interest amount must be ${formatAmount(interest)}`
            })
        }
        // Compute Compromise
        const compromise = computeCompromise(form_details.due_date, form_details.tax_due);
        form_details.compromise = form_details.compromise ? form_details.compromise : 0;
        console.log('Compromise :', compromise, ':', form_details.compromise);
        if (formatAmount(form_details.compromise) !== formatAmount(compromise)) {
            errors.push({
                page,
                field: 'compromise',
                error: `Compromise amount must be ${formatAmount(compromise)}`
            })
        }
    }
    return errors;
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
    checkDueDate
}
