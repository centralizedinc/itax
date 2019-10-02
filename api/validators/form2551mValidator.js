'use strict'

var Form2551MModel = require('../models/forms/form2551MModel.js');
var commonValidator = require('./commonValidator.js');


/**
 * 
 * @param {*} form_details 
 * @param {*} callback 
 */
function validate(form_details, callback) {
    var form = new Form2551MModel(form_details);

    //validation begins ...
    var error_messages = {};

    console.log('FORM:::' + JSON.stringify(form));
    // 1. validate form details
    if (!form.yearEndedMonth) {
        error_messages.yearEndedMonth = [];
        error_messages.yearEndedMonth.push("Year Ended Month is a mandatory field");
    }

    if (!form.yearEndedYear) {
        error_messages.yearEndedYear = [];
        error_messages.yearEndedYear.push("Year Ended Year is a mandatory field");
    }

    if (!form.returnPeriodMonth) {
        error_messages.returnPeriodMonth = [];
        error_messages.returnPeriodMonth.push("Return Period Month is a mandatory field");
    }

    if (!form.returnPeriodYear) {
        error_messages.returnPeriodYear = [];
        error_messages.returnPeriodYear.push("Return Period Year is a mandatory field");
    }

    if (!form.returnPeriod) {
        error_messages.returnPeriod = [];
        error_messages.returnPeriod.push("Return Period is a mandatory field");
    }
    //  else if (commonValidator.isFutureDate(form.returnPeriod)) {
    //     error_messages.returnPeriodMonth = [];
    //     error_messages.returnPeriodMonth.push("Invalid Return Period");

    //     error_messages.returnPeriodYear = [];
    //     error_messages.returnPeriodYear.push("Invalid Return Period");
    // }

    if (form.part2List) {
        var part2Errors = [];
        form.part2List.forEach((part2) => {
            var part2Err = {};

            if (!part2.txbleTransaction) {
                part2Err.txbleTransaction = [];
                part2Err.txbleTransaction.push('Nature Of Income Payment is a mandatory field');
            }

            if (!part2.atcCode) {
                part2Err.atcCode = [];
                part2Err.atcCode.push('ATC is a mandatory field');
            }

            if (!part2.txbleAmt) {
                part2Err.txbleAmt = [];
                part2Err.txbleAmt.push('Tax Base is a mandatory field');
            }

            if (!part2.taxRate) {
                part2Err.taxRate = [];
                part2Err.taxRate.push('Tax Rate is a mandatory field');
            }

            if (!part2.taxDue) {
                part2Err.taxDue = [];
                part2Err.taxDue.push('Tax Required to be Withheld is a mandatory field');
            }

            if (!part2Err !== {}) {
                part2Errors.push(part2Err);
            }
        });
        if (part2Errors.length !== 0) {
            error_messages.part2List = part2Errors;
        }
    }

    if (form.sched1List) {
        var sched1Errors = [];
        form.sched1List.forEach((sched1) => {
            var sched1Err = {};

            if (!sched1.periodCovered) {
                sched1Err.periodCovered = [];
                sched1Err.periodCovered.push('Period Cover is a mandatory field');
            }

            if (!sched1.name) {
                sched1Err.name = [];
                sched1Err.name.push('Name of Withholding Agent is a mandatory field');
            }

            if (!sched1.incPymt) {
                sched1Err.incPymt = [];
                sched1Err.incPymt.push('Income Payments is a mandatory field');
            }

            if (!sched1.taxWthld) {
                sched1Err.taxWthld = [];
                sched1Err.taxWthld.push('Tax Withheld is a mandatory field');
            }

            if (!sched1.wthldAppliedCurr) {
                sched1Err.wthldAppliedCurr = [];
                sched1Err.wthldAppliedCurr.push('Applied is a mandatory field');
            }

            if (sched1Err !== {}) {
                sched1Errors.push(sched1Err);
            }
        });
        if (sched1Errors.length !== 0) {
            error_messages.sched1List = sched1Errors;
        }
    }

    //2. validate due date
    if (form.returnPeriod) {
        form.dueDate = computeDueDate(form.returnPeriod);
    }

    // 3. validate computations and late filing
    console.log('BEFORE:::' + JSON.stringify(error_messages));
    error_messages = validateComputations(form, error_messages);

    var success_flag = true;

    if (!error_messages.length) {
        success_flag = false;
    }

    console.log("############ error_messages: " + error_messages);

    callback({
        success: success_flag,
        errors: error_messages
    });
}

function computeDueDate(returnPeriod) {
    var due_date = new Date();
    console.log('return period:::' + returnPeriod);
    var month = new Date(returnPeriod).getMonth() + 1;

    //every 20th of the next month
    due_date.setDate(20);
    due_date.setMonth(month);

    return due_date;
}

/**
 * 
 * @param {form2551MModel} form 
 */
function validateComputations(form, error_messages) {
    var item19Total = 0;
    var item20Total = 0;
    var item21 = 0;
    var item22 = 0;
    var surcharge = 0;
    var interest = 0;
    var compromise = 0;
    var totalPenalties = 0;
    var totalAmountPayable = 0;

    if (form.part2List && form.part2List.length) {
        form.part2List.forEach((part2) => {
            item19Total += part2.taxDue;
        });

        if (item19Total !== form.taxDue) {
            error_messages.taxDue = [];
            error_messages.taxDue.push("Invalid Amount of Tax Due. Computed amount: " + item19Total);
        }
    }

    if (form.sched1List && form.sched1List.length) {
        form.sched1List.forEach((sched1) => {
            item20Total += sched1.wthldAppliedCurr;
        });

        if (item20Total !== form.taxWithheld) {
            error_messages.taxWithheld = [];
            error_messages.taxWithheld.push("Invalid Amount of Tax Withheld. Computed amount: " + item20Total);
        }
    }

    item21 = item20Total + form.prevTaxPaid
    if (item21 !== form.totalCredits) {
        error_messages.totalCredits = [];
        error_messages.totalCredits.push("Invalid Amount of Total Credits. Computed amount: " + item21);
    }

    item22 = item19Total - item21;
    if (item22 !== form.amountPayable) {
        error_messages.amountPayable = [];
        error_messages.amountPayable.push("Invalid Amount of Amount Payable. Computed amount: " + item22);
    }

    //late filing
    var late_filing = commonValidator.isLateFiling(form.dueDate);
    console.log('LATE FILING:::' + form.dueDate);
    if (late_filing) {
        surcharge = commonValidator.computeSurcharges(item22);
        if (surcharge !== form.surcharge) {
            error_messages.surcharge = [];
            error_messages.surcharge.push("Invalid Amount of Surcharge. Computed amount: " + surcharge);
        }

        interest = commonValidator.computeInterest(form.dueDate, item22);
        if (interest !== form.interest) {
            error_messages.interest = [];
            error_messages.interest.push("Invalid Amount of Interest. Computed amount: " + interest);
        }

        compromise = commonValidator.computeCompromise();
        if (compromise !== form.compromise) {
            error_messages.compromise = [];
            error_messages.compromise.push("Invalid Amount of Compromise. Computed amount: " + compromise);
        }

        totalPenalties = surcharge + interest + compromise;
        if (totalPenalties !== form.penalties) {
            error_messages.penalties = [];
            error_messages.penalties.push("Invalid Amount of Total Penalties. Computed amount: " + totalPenalties);
        }
    }



    totalAmountPayable = item22 + totalPenalties;
    if (totalAmountPayable !== form.totalAmountPayable) {
        error_messages.totalAmountPayable = [];
        error_messages.totalAmountPayable.push("Invalid Amount of Total Amount Payable. Computed amount: " + totalAmountPayable);
    }

    return error_messages;
}


module.exports = {
    validate
}