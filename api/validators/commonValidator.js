'use strict'

var taxpayerDetails = require('../models/taxpayerDetailsModel.js');

const constant_helper = require('../utils/constant_helper');

function validateTaxpayerDetails(tp) {
    var error_messages = [];
    // var tp = new taxpayerDetails(taxpayer);
    console.log('tp', JSON.stringify(tp))
    console.log('!tp.tin', !tp.tin)
    if (!tp.tin) {
        error_messages.push({ field: "taxpayer.tin", error: constant_helper.MANDATORY_FIELD('TIN') });
    }

    if (!tp.rdo_code) {
        error_messages.push({ field: "taxpayer.rdo_code", error: constant_helper.MANDATORY_FIELD('RDO Code') });
    }

    // if (!tp.branch_code) {
    //     error_messages.push({ field: "taxpayer.branch_code", error: "Branch Code is a mandatory field" });
    // }

    if (!tp.registered_name) {
        error_messages.push({ field: "taxpayer.registered_name", error: constant_helper.MANDATORY_FIELD('Registered Name') });
    }
    if (!tp.contact_details.telno) {
        error_messages.push({ field: "taxpayer.contact_details.telno", error: constant_helper.MANDATORY_FIELD('Telephone no') });
    }
    if (!tp.address) {
        error_messages.push({ field: "taxpayer.address", error: constant_helper.MANDATORY_FIELD('Registered Address') });
    }
    if (!tp.address_details.zipCode) {
        error_messages.push({ field: "taxpayer.address_details.zipCode", error: constant_helper.MANDATORY_FIELD('Zip Code') });
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
 * @param {Date} dueDate 
 */
function isLateFiling(due_date) {
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
    var interest = 0.0;
    var dayDifference = 0;

    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = dueDate;
    var secondDate = new Date();

    if (amount <= 0.0) {
        interest = 0.0;
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

module.exports = {
    isFutureDate,
    validateTaxpayerDetails,
    isLateFiling,
    computeSurcharges,
    computeInterest,
    computeCompromise,
    validateMandatory
}
