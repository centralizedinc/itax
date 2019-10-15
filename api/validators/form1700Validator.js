'use strict'

var commonValidator = require('./commonValidator.js');


/**
 * 
 * @param {*} form_details 
 * @returns [Array] errors
 */
function validate(form_details) {

    //validation begins ...
    var errors = [];

    return { errors, due_date: form_details.due_date }
}

function computeDueDate(return_period) {
    var due_date = new Date();

    var month = return_period.getMonth() + 1;

    //every 20th of the next month
    due_date.setDate(20);
    due_date.setMonth(month);

    return due_date;
}

module.exports = {
    validate
}