'use strict'

// Dao
const FormDao = require('../dao/forms/FormDao');
const ReturnDetailsDao = require('../dao/ReturnDetailsDao');

const activity = require('../services/actvities_service')

/**
 * @returns {Promise}
 * @param {String} form_type 
 * @param {Object} form_details 
 */
function save(form_type, form_details) {
    console.log('Saving form ...');
    return new Promise((resolve, reject) => {
        new FormDao(form_type).create(form_details)
            .then((result) => {
                console.log(`result is saving form(${form_type}):`, result);
                const model = {
                    reference_no: result.reference_no,
                    tin: result.taxpayer.tin,
                    form_type: form_type,
                    return_period: result.return_period,
                    due_date: result.due_date,
                    tax_due: result.tax_due,
                    total_amount_payable: result.total_amount_payable,
                    total_penalties: result.penalties,
                    date_filed: result.date_created,
                    date_created: result.date_created,
                    created_by: result.created_by
                }
                return ReturnDetailsDao.create(model);
            })
            .then((result) => {
                console.log(`Return Details(${form_type}) :`, result);
                activity.file(result.tin, result)
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            });
    })
}

module.exports = {
    save
}