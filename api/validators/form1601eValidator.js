'use strict'

var Form1601EModel = require('../models/forms/form1601EModel.js');
var commonValidator = require('./commonValidator.js');


/**
 * 
 * @param {*} form_details 
 * @param {*} callback 
 */
function validate(form_details, callback) {
    var form = new Form1601EModel(form_details);

    //validation begins ...
    var errors = null;

    //1. validate mandatory fields
    //1.1 taxpayer details
    // error_messages = commonValidator.validateTaxpayerDetails(form.taxpayer);

    //1.2 form details
    // if (!form.returnPeriod) {
    //     error_messages.returnPeriod = [];
    //     error_messages.returnPeriod.push("Return Period is a mandatory field");
    //     // error_messages.push({ field: "returnPeriod", error: "Return Period is a mandatory field" });
    // } else if (commonValidator.isFutureDate(form.returnPeriod)) {
    //     // error_messages.push({ field: "returnPeriodMonth", error: "Invalid Return Period" });
    //     // error_messages.push({ field: "returnPeriodYear", error: "Invalid Return Period" });
    //     error_messages.returnPeriodMonth = [];
    //     error_messages.returnPeriodMonth.push("Invalid Return Period");

    //     error_messages.returnPeriodYear = [];
    //     error_messages.returnPeriodYear.push("Invalid Return Period");
    // }

    // if (!form.opnYn) {
    //     error_messages.push({ field: "opnYn", error: "Any Tax Withheld is a mandatory field" });
    //     error_messages.opnYn = [];
    //     error_messages.opnYn.push("Any Tax Withheld is a mandatory field");
    // }

    // if (form.opnYn === 'YES') {
    //     if (form.amtDueCrdtb === 0) {
            
    //         error_messages.amtDueCrdtb = [];
    //         error_messages.amtDueCrdtb.push("Amount Due is zero");
    //     }
    //     if (!form.categoryOfAgent) {
    //         // error_messages.push({ field: "categoryOfAgent", error: "categoryOfAgent" });
    //         error_messages.categoryOfAgent = [];
    //         error_messages.categoryOfAgent.push("Category of Agent is mandatory");
    //     }
    // }

    // if (form.atcList && form.atcList.length) {
    //     form.atcList.forEach((atc) => {
    //         error_messages.atc = {};
    //         if (!atc.description) {
    //             // error_messages.push({ field: "atcList.description", error: "atcList.description" });
    //             error_messages.atc.description = [];
    //             error_messages.atc.description .push("ATC Description is mandatory field");
    //         }

    //         if (!atc.code) {
    //             // error_messages.push({ field: "atcList.code", error: "atcList.code" });
    //             error_messages.atc.code = [];
    //             error_messages.atc.code.push("ATC Code is mandatory field");
    //         }

    //         if (!atc.txbleAmt) {
    //             // error_messages.push({ field: "atcList.txbleAmt", error: "atcList.txbleAmt" });
    //             error_messages.atc.txbleAmt = [];
    //             error_messages.atc.txbleAmt.push("ATC Taxable Amount is mandatory field");
    //         }

    //         if (!atc.taxRate) {
    //             // error_messages.push({ field: "atcList.taxRate", error: "atcList.taxRate" });
    //             error_messages.atc.taxRate = [];
    //             error_messages.atc.taxRate.push("ATC Tax Rate is mandatory field");
    //         }

    //         if (!atc.taxDue) {
    //             // error_messages.push({ field: "atcList.taxDue", error: "atcList.taxDue" });
    //             error_messages.atc.taxDue = [];
    //             error_messages.atc.taxDue.push("ATC Tax Due is mandatory field");
    //         }
    //     })
    // }

    // if (!form.categoryOfAgent) {
    //     // error_messages.push({ field: "categoryOfAgent", error: "categoryOfAgent" });
    //     error_messages.categoryOfAgent = [];
    //     error_messages.categoryOfAgent.push("ATC Description is mandatory field");
    // }

    // if (form.totalAmtPayblCrdtb < 0) {
    //     // error_messages.push({ field: "totalAmtPayblCrdtb", error: "totalAmtPayblCrdtb" });
    //     error_messages.totalAmtPayblCrdtb = [];
    //     error_messages.totalAmtPayblCrdtb.push("Total Amount Payable is mandatory field");
    // }


    // //2. validate due date
    // if (form.returnPeriod) {
    //     form.dueDate = computeDueDate(form.returnPeriod);
    // }
    

    // //4. validate ammended return

    // //5. validate computations
    // // error_messages.concat(validateComputations(form));

    // var success_flag = false;

    // if(!error_messages.length){
    //     success_flag = true;
    // }

    // console.log("############ error_messages: " + error_messages);
    // callback({
    //     success:success_flag,
    //     errors: error_messages
    // });
    return errors;
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
            item14Total = item14Total + atc.taxDue;
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
    var late_filing = commonValidator.isLateFiling(form.dueDate);

    if (late_filing) {
        item17A_surcharge = commonValidator.computeSurcharges(item16);
        if (item17A_surcharge ==!form.surcharge) {
            error_messages.push({ field: "surcharge", error: "surcharge" });
        }

        item17B_interest = commonValidator.computeInterest(form.dueDate, item16);
        if (item17B_interest ==! form.interest) {
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