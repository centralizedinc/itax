'use strict'

var form1601CModel = require('../models/forms/form1601CModel.js');
var commonValidator = require('./commonValidator.js');

// utils
const constant_helper = require('../utils/constant_helper');

/**
 * @returns {Object} errors, due_date
 * @param {*} form_details 
 */
function validate(form_details) {
    console.log("validation form details(1601c): " + JSON.stringify(form_details))
    //validation begins ...
    var errors = [];

    // if (!form_details.returnPeriodYear || !form_details.returnPeriodMonth || !form_details.returnPeriod) {
    //     errors.push({ page: 0, field: "returnPeriod", error: constant_helper.MANDATORY_FIELD('Return Period') });
    //     return { errors };
    // }

    // form_details.due_date = computeDueDate(form_details.returnPeriod)
    // console.log('form 1601c due date :', form_details.due_date);
    // //validate required fields
    // errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));

    // errors.push(...validateRequired(form_details));

    // if (commonValidator.isLateFiling(form_details.due_date)) {
    //     console.log('Late filling ...');
    //     // Compute Surcharge
    //     const surcharge = commonValidator.computeSurcharges(form_details.amtPayblCrdtb);
    //     form_details.surcharge = form_details.surcharge ? form_details.surcharge : 0;
    //     console.log('Surcharge :', surcharge, ':', form_details.surcharge);
    //     if (commonValidator.formatAmount(form_details.surcharge) !== commonValidator.formatAmount(surcharge)) {
    //         errors.push({
    //             page: 2,
    //             field: 'surcharge',
    //             error: `Surcharge amount must be ${commonValidator.formatAmount(surcharge)}`
    //         })
    //     }
    //     // Compute Interest
    //     const interest = commonValidator.computeInterest(form_details.due_date, form_details.amtPayblCrdtb);
    //     form_details.interest = form_details.interest ? form_details.interest : 0;
    //     console.log('Interest :', interest, ':', form_details.interest);
    //     if (commonValidator.formatAmount(form_details.interest) !== commonValidator.formatAmount(interest)) {
    //         errors.push({
    //             page: 2,
    //             field: 'interest',
    //             error: `Interest amount must be ${commonValidator.formatAmount(interest)}`
    //         })
    //     }
    //     // Compute Compromise
    //     const compromise = commonValidator.computeCompromise(form_details.due_date, form_details.amtPayblCrdtb);
    //     form_details.compromise = form_details.compromise ? form_details.compromise : 0;
    //     console.log('Compromise :', compromise, ':', form_details.compromise);
    //     if (commonValidator.formatAmount(form_details.compromise) !== commonValidator.formatAmount(compromise)) {
    //         errors.push({
    //             page: 2,
    //             field: 'compromise',
    //             error: `Compromise amount must be ${commonValidator.formatAmount(compromise)}`
    //         })
    //     }
    // }

    // console.log('form 1601c validator errors: ', JSON.stringify(errors))

    // return { errors, due_date: form_details.due_date }
    return {errors}
}

function validateRequired(form) {
    var errors = []
    console.log('form.taxes_withheld :', form.taxes_withheld);
    if (form.taxes_withheld === undefined || form.taxes_withheld === null) {
        errors.push({ page: 0, field: "taxes_withheld", error: constant_helper.MANDATORY_FIELD('Any Taxes Withheld') });
    } else if(form.taxes_withheld){
        if (!form.atc_list || !form.atc_list.length) {
            errors.push({ page: 2, field: "atc_list", error: constant_helper.MANDATORY_FIELD('ATC') });
        }
    }

    if (!form.category_of_agent) {
        errors.push({ page: 1, field: "category_of_agent", error: constant_helper.MANDATORY_FIELD('Category of Withholding Agent') });
    }
}

function computeDueDate(returnPeriod) {
    var due_date = new Date();

    var month = returnPeriod.getMonth() + 1;

    //every 10th of the next month
    due_date.setDate(10);
    due_date.setMonth(month);

    return due_date;
}

/**
 * 
 * @param {form1601CModel} form 
 */
function validateComputations(form) {
    var error_messages = [];

    var item14Total = 0;
    var item15C = 0;
    var item16 = 0;
    var item17A_surcharge = 0;
    var item17B_interest = 0;
    var item17C_compromise = 0;
    var item17D_total = 0;
    var item18 = 0;

    if (form.atcList && form.atcList.length) {
        form.atcList.forEach((atc) => {
            item14Total = item14Total + atc.taxDue;
        });

        if (item14Total !== form.tax_due) {
            error_messages.push({ field: "tax_due", error: "tax_due" });
        }
    }

    item15C = form.other_payments_made + form.adv_payment;
    if (item15C !== form.total_payments_made) {
        error_messages.push({ field: "total_payments_made", error: "total_payments_made" });
    }

    item16 = form.other_payments_made - form.total_payments_made;
    if (item16 !== form.total_amount_payable) {
        error_messages.push({ field: "totalAmtPayblCrdtb", error: "total_amount_payable" });
    }

    //late filing
    var late_filing = commonValidator.isLateFiling(form.tax_due);

    if (late_filing) {
        item17A_surcharge = commonValidator.computeSurcharges(item16);
        if (item17A_surcharge ==!form.surcharge) {
            error_messages.push({ field: "surcharge", error: "surcharge" });
        }

        item17B_interest = commonValidator.computeInterest(form.tax_due, item16);
        if (item17B_interest ==! form.interest) {
            error_messages.push({ field: "interest", error: "interest" });
        }

        // item17C_compromise = commonValidator.computeCompromise();
        // if (item17C_compromise==!form.compromise) {
        //     error_messages.push({ field: "compromise", error: "compromise" });
        // }
    }



    item17D_total = item17A_surcharge + item17B_interest + item17C_compromise;
    if (item17D_total !== form.penalties) {
        error_messages.push({ field: "penalties", error: "penalties" });
    }

    item18 = item16 + item17D_total;
    if (item18 !== form.total_amount_payable) {
        error_messages.push({ field: "total_amount_payable", error: "total_amount_payable" });
    }




}


module.exports = {
    validate
}