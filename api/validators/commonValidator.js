'use strict'

var taxpayerDetails = require('../models/taxpayerDetailsModel.js');

const constant_helper = require('../utils/constant_helper');

function validateTaxpayerDetails(tp, page) {
    var error_messages = [];
    // var tp = new taxpayerDetails(taxpayer);
    console.log('page :', page);
    console.log('tp', JSON.stringify(tp))
    console.log('!tp.tin', !tp.tin)
    if (!tp.tin) {
        error_messages.push({ page, field: "taxpayer.tin", error: constant_helper.MANDATORY_FIELD('TIN') });
    }

    if (!tp.rdo_code) {
        error_messages.push({ page, field: "taxpayer.rdo_code", error: constant_helper.MANDATORY_FIELD('RDO Code') });
    }

    // if (!tp.branch_code) {
    //     error_messages.push({ field: "taxpayer.branch_code", error: "Branch Code is a mandatory field" });
    // }

    if (!tp.registered_name) {
        error_messages.push({ page, field: "taxpayer.registered_name", error: constant_helper.MANDATORY_FIELD('Registered Name') });
    }
    if (!tp.contact_details.telno) {
        error_messages.push({ page, field: "taxpayer.contact_details.telno", error: constant_helper.MANDATORY_FIELD('Telephone no') });
    }
    if (!tp.address) {
        error_messages.push({ page, field: "taxpayer.address", error: constant_helper.MANDATORY_FIELD('Registered Address') });
    }
    if (!tp.address_details.zipCode) {
        error_messages.push({ page, field: "taxpayer.address_details.zipCode", error: constant_helper.MANDATORY_FIELD('Zip Code') });
    }

    // if (!tp.taxpayer.taxpayer_name) {
    //     error_messages.push({ field: "taxpayer.taxpayer_name", error: "Tax payer name is a mandatory field" });
    // }

    // if (!tp.taxpayer.registered_address) {
    //     error_messages.push({ field: "taxpayer.registered_address", error: "Tax payer registered address is a mandatory field" });
    // }

    // if (!tp.taxpayer.zip_code) {
    //     error_messages.push({ field: "taxpayer.zip_code", error: "Zip code is a mandatory field" });
    // }

    // if (!tp.taxpayer.birthday) {
    //     error_messages.push({ field: "taxpayer.birthday", error: "Tax payer birthday is a mandatory field" });
    // }

    // if (!tp.taxpayer.email_address) {
    //     error_messages.push({ field: "taxpayer.email_address", error: "Email address is a mandatory field" });
    // }

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
 * @param {Date} dueDate 
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
 * @param {Date} dueDate 
 * @param {Number} amount 
 */
function computeInterest(dueDate, amount) {
    var interest = 0;
    var dayDifference = 0;

    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = dueDate;
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

module.exports = {
    isFutureDate,
    validateTaxpayerDetails,
    isLateFiling,
    computeSurcharges,
    computeInterest,
    computeCompromise,
    validateMandatory,
    formatAmount
}
