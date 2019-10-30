'use strict'

require('../validators/form1706Validator')

/**
 * 
 * @param {String} form_type 
 * @param {FormModel} form_details 
 */
function validate(form_type, form_details) {
    console.log('Validation... :', form_type);
    try {
        return require(`../validators/form${form_type.toLowerCase()}Validator`).validate(form_details);
    } catch (err) {
        return { errors: [{ error: "Invalid Form Validator" }], form_details }
    }
}

module.exports = {
    validate
}