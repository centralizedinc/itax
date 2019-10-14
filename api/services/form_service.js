'use strict'

// Dao
const Form2550MDao = require('../dao/forms/Form2550MDao');
const Form2551QDao = require('../dao/forms/Form2551QDao')
const Form1601EDao = require('../dao/forms/Form1601EDao');
const Form1601FDao = require('../dao/forms/Form1601FDao');
const Form2000OTDao = require('../dao/forms/Form2000OTDao');
const Form1601CDao = require('../dao/forms/Form1601CDao');
const Form1601CDao = require('../dao/forms/Form1601CDao')
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
                return ReturnDetailsDao.create(result);
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
                        return_period: result.return_period,
                        due_date: result.due_date,
                        tax_due: result.tax_due,
                        total_amount_payable: result.total_amount_payable,
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
                        return_period: result.return_period,
                        due_date: result.due_date,
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
        }  else if (form_type.toUpperCase() === '1601F') {
            Form1601FDao.create(form_details)
                .then((result) => {
                    console.log('saveForm : ', result);
                    resolve({
                        reference_no: result.reference_no,
                        tin: result.taxpayer.tin,
                        form_type: form_type,
                        return_period: result.return_period,
                        due_date: result.due_date,
                        tax_due: result.tax_due,
                        total_amount_payable: result.total_amt_paybl,
                        total_penalties: result.penalties,
                        date_filed: result.date_created,
                        created_by: result.created_by
                    })
                }).catch((err) => {
                    console.log('saveForm rejected err : ', err)
                    reject(err)
                });
        } else if (form_type.toUpperCase() === '2000OT') {
            console.log('form_details :', form_details);
            Form2000OTDao.create(form_details)
                .then((result) => {
                    console.log('saveForm : ', result);
                    resolve({
                        reference_no: result.reference_no,
                        tin: result.taxpayer.tin,
                        form_type: form_type,
                        return_period: result.return_period,
                        due_date: result.due_date,
                        tax_due: result.tax_due,
                        total_amount_payable: result.total_amount_payable,
                        total_penalties: result.penalties,
                        date_filed: result.date_created,
                        created_by: result.created_by
                    })
                }).catch((err) => {
                    console.log('saveForm rejected err : ', err)
                    reject(err)
                });
        } else if (form_type.toUpperCase() === '1601C') {
            console.log('form_details :', form_details);
            Form1601CDao.create(form_details)
                .then((result) => {
                    console.log('saveForm : ', result);
                    resolve({
                        reference_no: result.reference_no,
                        tin: result.taxpayer.tin,
                        form_type: form_type,
                        return_period: result.return_period,
                        due_date: result.due_date,
                        tax_due: result.tax_due,
                        total_amount_payable: result.total_amount_payable,
                        total_penalties: result.penalties,
                        date_filed: result.date_created,
                        created_by: result.created_by
                    })
                }).catch((err) => {
                    console.log('saveForm rejected err : ', err)
                    reject(err)
                });
        } else if (form_type.toUpperCase() === '1700') {
            Form1700Dao.create(form_details)
        } else if (form_type.toUpperCase() === '1603') {
            console.log('form_details :', form_details);
            Form1603Dao.create(form_details)
                .then((result) => {
                    console.log('saveForm : ', result);
                    resolve({
                        reference_no: result.reference_no,
                        tin: result.taxpayer.tin,
                        form_type: form_type,
                        return_period: result.return_period,
                        due_date: result.due_date,
                        tax_due: result.tax_due,
                        total_amount_payable: result.total_amount_payable,
                        total_penalties: result.penalties,
                        date_filed: result.date_created,
                        created_by: result.created_by
                    })
                }).catch((err) => {
                    console.log('saveForm rejected err : ', err)
                    reject(err)
                });
        } else if (form_type.toUpperCase() === '2551Q') {
            console.log('form_details :', form_details);
            Form2551QDao.create(form_details)
                .then((result) => {
                    console.log('saveForm : ', result);
                    resolve({
                        reference_no: result.reference_no,
                        tin: result.taxpayer.tin,
                        form_type: form_type,
                        return_period: result.return_period,
                        due_date: result.due_date,
                        tax_due: result.tax_due,
                        total_amount_payable: result.total_amount_payable,
                        total_penalties: result.penalties,
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