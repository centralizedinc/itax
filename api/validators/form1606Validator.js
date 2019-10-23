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
    if (!form.taxes_withheld) { //item 4
        error_messages.push({ page: 0, field: "taxes_withheld", error: constant_helper.MANDATORY_FIELD('Any Taxes Withheld') });
    }

    if (!form.seller_details || !form.seller_details.tin) { //item 7
        error_messages.push({ page: 1, field: "seller_details.tin", error: constant_helper.MANDATORY_FIELD("Seller's TIN") });
    }

    if (!form.seller_details || !form.seller_details.rdo_code) { //item 8
        error_messages.push({ page: 1, field: "seller_details.rdo_code", error: constant_helper.MANDATORY_FIELD("Seller's Rdo Code") });
    }

    if (!form.seller_details || !form.seller_details.registered_name) { //item 10
        error_messages.push({ page: 1, field: "seller_details.registered_name", error: constant_helper.MANDATORY_FIELD("Seller's Name") });
    }

    if (!form.seller_details || !form.seller_details.address) { //item 12
        error_messages.push({ page: 1, field: "seller_details.registered_address", error: constant_helper.MANDATORY_FIELD("Seller's Address") });
    }

    if (!form.atc_code) { //item 13
        error_messages.push({ page: 1, field: "atc_code", error: constant_helper.MANDATORY_FIELD("ATC") });
    }

    if (!form.category_of_agent) { //item 14
        error_messages.push({ page: 1, field: "category_of_agent", error: constant_helper.MANDATORY_FIELD("Category of Agent") });
    }

    if (!form.classification_property) { //item 15
        error_messages.push({ page: 1, field: "classification_property", error: constant_helper.MANDATORY_FIELD("Classification of Property") });
    }

    if (!form.location_property) { //item 16
        error_messages.push({ page: 1, field: "location_property", error: constant_helper.MANDATORY_FIELD("Location of the Property") });
    }

    if (!form.location_rdo_code) { //item 16A
        error_messages.push({ page: 1, field: "location_rdo_code", error: constant_helper.MANDATORY_FIELD("RDO Code") });
    }

    if (!form.tct_no) { //item 17
        error_messages.push({ page: 1, field: "tct_no", error: constant_helper.MANDATORY_FIELD("TCT/OCT/CCT No.") });
    }
    return error_messages;
}

module.exports = {
    validate
}