'use strict'

// validators
var form1601eValidator = require('../validators/form1601eValidator.js');
var form2551mValidator = require('../validators/form2551mValidator.js');
var form2000OTValidator = require('../validators/form2000otValidator');
const form2550mValidator = require('../validators/form2550mValidator');

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
            return form2550mValidator.validate(form_details)
        case "1601E":
            return form1601eValidator.validate(form_details)
        //     form1601eValidator.validate(form_details, (response) => {
        //         // relay response ...
        //         callback(response);
        //     })
        //     break;
        // case "2551M":
        //     form2551mValidator.validate(form_details, (response) => {
        //         // relay response ...
        //         callback(response);
        //     })
        //     break;
        // case "2000OT":
        //     form2000OTValidator.validate(form_details, (response) => {
        //         // relay response ...
        //         callback(response);
        //     })
        //     break;
    }
}

module.exports = {
    validate
}