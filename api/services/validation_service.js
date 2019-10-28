'use strict'

// validators
const form1601eValidator = require('../validators/form1601eValidator.js');
const form2551qValidator = require('../validators/form2551qValidator.js');
const form2000OTValidator = require('../validators/form2000otValidator');
const form1700Validator = require('../validators/form1700Validator.js');
const form1701qValidator = require('../validators/form1701qValidator.js');
const form2550mValidator = require('../validators/form2550mValidator');
const form1601fValidator = require('../validators/form1601fValidator.js');
const form1601cValidator = require('../validators/form1601cValidator');
const form1603Validator = require('../validators/form1603Validator');
const form1606Validator = require('../validators/form1606Validator');
const form1600wpValidator = require('../validators/form1600wpValidator');
const form1604eValidator = require('../validators/form1604eValidator');
const form1601fqValidator = require('../validators/form1601fqValidator');
const form2551mValidator = require('../validators/form2551mValidator');
const form2550qValidator = require('../validators/form2550qValidators');
const form1702exValidator = require('../validators/form1702exValidator');
const form1702rtValidator = require('../validators/form1702rtValidator');
const form1701aValidator = require('../validators/form1701aValidator');
const form1601eqValidator = require('../validators/form1601eqValidator');
const form1603qValidator = require('../validators/form1603qValidator');

/**
 * 
 * @param {String} form_type 
 * @param {FormModel} form_details 
 */
function validate(form_type, form_details) {
    console.log('Validation... :', form_type);
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
        case "1601F":
            return form1601fValidator.validate(form_details);
        case "1601C":
            return form1601cValidator.validate(form_details);
        case "1603":
            return form1603Validator.validate(form_details);
        case "1606":
            return form1606Validator.validate(form_details);
        case "1600WP":
            return form1600wpValidator.validate(form_details);
        case "1604E":
            return form1604eValidator.validate(form_details);
        case "2550Q":
            return form2550qValidator.validate(form_details);
        case "1601FQ":
            return form1601fqValidator.validate(form_details);
        case "2551M":
            return form2551mValidator.validate(form_details);
        case "1702EX":
            return form1702exValidator.validate(form_details);
        case "1702RT":
            return form1702rtValidator.validate(form_details);
        case "1701A":
            return form1701aValidator.validate(form_details);
        case "1601EQ":
            return form1601eqValidator.validate(form_details);
        case "1603Q":
            return form1603qValidator.validate(form_details);
        default:
            return { errors: [{ error: "Invalid Form Validator" }], form_details }
    }
}

module.exports = {
    validate
}