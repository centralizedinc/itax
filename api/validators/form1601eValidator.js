'use strict'

var Form1601EModel = require('../models/forms/form1601EModel.js');
var commonValidator = require('./commonValidator.js');

// utils
const constant_helper = require('../utils/constant_helper');

/**
 * @returns {Object} errors, due_date
 * @param {*} form_details 
 */
function validate(form_details) {
    console.log("validation form details(1601e): " + JSON.stringify(form_details))
    //validation begins ...
    var errors = [];

    const validated_return = commonValidator.validateReturnPeriodByMonthYear(form_details.return_period_year, form_details.return_period_month, 0);
    if (validated_return.errors && validated_return.errors.length) return { errors: validated_return.errors };
    else form_details.return_period = validated_return.return_period;
    console.log('form 1601e return period :', form_details.return_period);

    form_details.due_date = computeDueDate(form_details.return_period)
    console.log('form 1601e due date :', form_details.due_date);
    //validate required fields
    errors.push(...commonValidator.validateTaxpayerDetails(form_details.taxpayer, 1));

    errors.push(...validateRequired(form_details));

    var { error_messages, form_details } = commonValidator.checkDueDate(form_details, 2);
    errors.push(...error_messages);

    console.log('form 1601e validator errors: ', JSON.stringify(errors))

    return { errors, form_details }
}

function validateRequired(form) {
    var errors = []
    console.log('form.taxes_withheld :', form.taxes_withheld);
    if (form.taxes_withheld === undefined || form.taxes_withheld === null) {
        errors.push({ page: 0, field: "taxes_withheld", error: constant_helper.MANDATORY_FIELD('Any Taxes Withheld') });
    } else if (form.taxes_withheld) {
        if (!form.atc_list || !form.atc_list.length) {
            errors.push({ page: 2, field: "atc_list", error: constant_helper.MANDATORY_FIELD('ATC') });
        }
    }

    if (!form.taxpayer.line_of_business) {
        errors.push({ page: 1, field: "taxpayer.line_of_business", error: constant_helper.MANDATORY_FIELD('Line of Business') });
    }

    if (!form.categoryOfAgent) {
        errors.push({ page: 1, field: "categoryOfAgent", error: constant_helper.MANDATORY_FIELD('Category of Withholding Agent') });
    }
}

function computeDueDate(return_period) {
    var due_date = new Date();

    var month = return_period.getMonth() + 1;

    //every 10th of the next month
    due_date.setDate(10);
    due_date.setMonth(month);

    return due_date;
}

/**
 * 
 * @param {form1601EModel} form 
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
            item14Total = item14Total + atc.tax_due;
        });

        if (item14Total !== form.amtDueCrdtb) {
            error_messages.push({ field: "amtDueCrdtb", error: "amtDueCrdtb" });
        }
    }

    item15C = form.prevTaxPaidCrdtb + form.advPayment;
    if (item15C !== form.totTaxCredits) {
        error_messages.push({ field: "totTaxCredits", error: "totTaxCredits" });
    }

    item16 = form.prevTaxPaidCrdtb - form.totTaxCredits;
    if (item16 !== form.totalAmtPayblCrdtb) {
        error_messages.push({ field: "totalAmtPayblCrdtb", error: "totalAmtPayblCrdtb" });
    }

    //late filing
    var late_filing = commonValidator.isLateFiling(form.due_date);

    if (late_filing) {
        item17A_surcharge = commonValidator.computeSurcharges(item16);
        if (item17A_surcharge == !form.surcharge) {
            error_messages.push({ field: "surcharge", error: "surcharge" });
        }

        item17B_interest = commonValidator.computeInterest(form.due_date, item16);
        if (item17B_interest == !form.interest) {
            error_messages.push({ field: "interest", error: "interest" });
        }

        // item17C_compromise = commonValidator.computeCompromise();
        // if (item17C_compromise==!form.compromise) {
        //     error_messages.push({ field: "compromise", error: "compromise" });
        // }
    }



    item17D_total = item17A_surcharge + item17B_interest + item17C_compromise;
    if (item17D_total !== form.penaltiesCrdtb) {
        error_messages.push({ field: "penaltiesCrdtb", error: "penaltiesCrdtb" });
    }

    item18 = item16 + item17D_total;
    if (item18 !== form.totalAmtPayblCrdtb) {
        error_messages.push({ field: "totalAmtPayblCrdtb", error: "totalAmtPayblCrdtb" });
    }




}


module.exports = {
    validate
}