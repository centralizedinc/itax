'use strict'

// validators
const form1601eValidator = require('../validators/form1601eValidator.js');
const form2551qValidator = require('../validators/form2551qValidator.js');
const form2000OTValidator = require('../validators/form2000otValidator');
const form1700Validator = require('../validators/form1700Validator.js')
const form1701qValidator = require('../validators/form1701qValidator.js')
const form2550mValidator = require('../validators/form2550mValidator');
const form1601cValidator = require('../validators/form1601CValidator.js')

/**
 * 
 * @param {String} form_type 
 * @param {FormModel} form_details 
 */
function validate(form_type, form_details) {
    console.log('Validation... :', form_type);
    console.log('Form details... :', form_details);
    switch (form_type.toUpperCase()) {
        case "2550M":
            return form2550mValidator.validate(form_details);
        case "1601E":
            return form1601eValidator.validate(form_details);
        case "2551Q":
            return form2551qValidator.validate(form_details);
        case "1700":
            return form1700Validator.validate(form_details);
        case "1701Q":
            return form1701qValidator.validate(form_details);
        case "2000OT":
            return form2000OTValidator.validate(form_details);
        case "1601C":
            return form1601CValidator.validate(form_details);
    }
}

module.exports = {
    validate
}