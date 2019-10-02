'use strict'

//import models
var Form1601EModel = require('../models/forms/form1601EModel');
var Form2550MModel = require('../models/forms/form2550MModel');
var Form2551MModel = require('../models/forms/form2551MModel');
var Form2000OTModel = require('../models/forms/form2000OTModel');

// Dao
const Form2550MDao = require('../dao/forms/Form2550MDao');
const Form1601EDao = require('../dao/forms/Form1601EDao');
const ReturnDetailsDao = require('../dao/ReturnDetailsDao');

/**
 * @returns {Promise}
 * @param {String} form_type 
 * @param {Object} form_details 
 */
function save(form_type, form_details) {
    return new Promise((resolve, reject) => {
        saveForm(form_type, form_details)
            .then((result) => {
                return ReturnDetailsDao.create(result);
            })
            .then((result) => {
                resolve(result);
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
    return new Promise((resolve, reject) => {
        if (form_type.toUpperCase() === '2550M') {
            console.log('form_details :', form_details);
            Form2550MDao.create(form_details)
                .then((result) => {
                    console.log('saveForm : ', result);
                    resolve({
                        reference_no: result.reference_no,
                        tin: result.taxpayer.tin,
                        form_type: form_type,
                        return_period: result.returnPeriod,
                        due_date: result.dueDate,
                        tax_due: result.taxDue,
                        total_amount_payable: result.totalAmountPayable,
                        total_penalties: result.penalties,
                        date_filed: result.date_created,
                        created_by: result.created_by
                    })
                }).catch((err) => {
                    console.log('saveForm rejected err : ', err)
                    reject(err)
                });
        } else if (form_type.toUpperCase() === '1601E') {
            Form1601EDao.create(form_details)
                .then((result) => {
                    console.log('saveForm : ', result);
                    resolve({
                        reference_no: result.reference_no,
                        tin: result.taxpayer.tin,
                        form_type: form_type,
                        return_period: result.returnPeriod,
                        due_date: result.dueDate,
                        tax_due: result.amtPayblCrdtb,
                        total_amount_payable: result.totalAmtPayblCrdtb,
                        total_penalties: result.penaltiesCrdtb,
                        date_filed: result.date_created,
                        created_by: result.created_by
                    })
                }).catch((err) => {
                    console.log('saveForm rejected err : ', err)
                    reject(err)
                });
        } else reject({ message: "Form does not exist" })
    })
}


module.exports = {
    save
}