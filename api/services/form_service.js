'use strict'

// Dao
const Form2550MDao = require('../dao/forms/Form2550MDao');
const Form2551QDao = require('../dao/forms/Form2551QDao')
const Form1601EDao = require('../dao/forms/Form1601EDao');
const Form1601FDao = require('../dao/forms/Form1601FDao');
const Form2000OTDao = require('../dao/forms/Form2000OTDao');
const Form1601CDao = require('../dao/forms/Form1601CDao');
const Form1603Dao = require('../dao/forms/Form1603Dao')
const ReturnDetailsDao = require('../dao/ReturnDetailsDao');
const Form1700Dao = require('../dao/forms/Form1700Dao');

const activity = require('../services/actvities_service')

/**
 * @returns {Promise}
 * @param {String} form_type 
 * @param {Object} form_details 
 */
function save(form_type, form_details) {
    return new Promise((resolve, reject) => {
        saveForm(form_type, form_details)
            .then((result) => {
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
                activity.file(result.tin, result)
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            });
    })
}

/**
 * @returns {Promise}
 * @param {String} form_type 
 * @param {Object} form_details 
 */
function saveForm(form_type, form_details) {
    if (form_type.toUpperCase() === '2550M') return Form2550MDao.create(form_details);
    else if (form_type.toUpperCase() === '1601E') return Form1601EDao.create(form_details);
    else if (form_type.toUpperCase() === '1601F') return Form1601FDao.create(form_details);
    else if (form_type.toUpperCase() === '2000OT') return Form2000OTDao.create(form_details);
    else if (form_type.toUpperCase() === '1601C') return Form1601CDao.create(form_details);
    else if (form_type.toUpperCase() === '1700') return Form1700Dao.create(form_details);
    else if (form_type.toUpperCase() === '1603') return Form1603Dao.create(form_details);
    else if (form_type.toUpperCase() === '2551Q') return Form2551QDao.create(form_details);
    else Promise.reject({ message: "Form does not exist" });
}


module.exports = {
    save
}