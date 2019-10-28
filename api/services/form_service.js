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
const Form1606Dao = require('../dao/forms/Form1606Dao');
const Form1600WPDao = require('../dao/forms/Form1600WPDao');
const Form1701QDao = require('../dao/forms/Form1701QDao');
const Form1604EDao = require('../dao/forms/Form1604EDao');
const Form1601FQDao = require('../dao/forms/Form1601FQDao')
const Form2551MDao = require('../dao/forms/Form2551MDao')
const Form2550QDao = require('../dao/forms/Form2550QDao');
const Form1702EXDao = require('../dao/forms/Form1702EXDao');
const Form1702RTDao = require('../dao/forms/Form1702RTDao');
const Form1701ADao = require('../dao/forms/Form1701ADao');
const Form1601EQDao = require('../dao/forms/Form1601EQDao');
const Form1602QDao = require('../dao/forms/Form1602QDao');

const activity = require('../services/actvities_service')

/**
 * @returns {Promise}
 * @param {String} form_type 
 * @param {Object} form_details 
 */
function save(form_type, form_details) {
    console.log('Saving form ...');
    return new Promise((resolve, reject) => {
        saveForm(form_type, form_details)
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
    else if (form_type.toUpperCase() === '1606') return Form1606Dao.create(form_details);
    else if (form_type.toUpperCase() === '1600WP') return Form1600WPDao.create(form_details);
    else if (form_type.toUpperCase() === '1701Q') return Form1701QDao.create(form_details);
    else if (form_type.toUpperCase() === '1604E') return Form1604EDao.create(form_details);
    else if (form_type.toUpperCase() === '1601FQ') return Form1601FQDao.create(form_details);
    else if (form_type.toUpperCase() === '2551M') return Form2551MDao.create(form_details);
    else if (form_type.toUpperCase() === '2550Q') return Form2550QDao.create(form_details);
    else if (form_type.toUpperCase() === '1702EX') return Form1702EXDao.create(form_details);
    else if (form_type.toUpperCase() === '1702RT') return Form1702RTDao.create(form_details);
    else if (form_type.toUpperCase() === '1701A') return Form1701ADao.create(form_details);
    else if (form_type.toUpperCase() === '1601EQ') return Form1601EQDao.create(form_details);
    else if (form_type.toUpperCase() === '1602Q') return Form1602QDao.create(form_details);
    else Promise.reject({
        message: "Form does not exist"
    });
}


module.exports = {
    save
}