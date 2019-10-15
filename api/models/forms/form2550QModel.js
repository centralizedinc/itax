'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Form2550qSchema = new Schema({
    referenceNo: Number,
    yearType: String,
    yearEndedMonth: String,
    yearEndedYear: String,
    return_period_month: String,
    return_period_year: String,
    return_period: String,
    amended_yn: Boolean,
    numSheets: Number,
    taxpayer: {},
    accountingType: Boolean,
    specialRateFlag: Boolean,
    internationalTreatyFlag: Boolean,
    tax_due: Number,
    taxWithheld: Number,
    prevTaxPaid: Number,
    totalCredits: Number,
    amountPayable: Number,
    surcharge: Number,
    interest: Number,
    compromise: Number,
    penalties: Number,
    total_amount_payable: Number,
    refundType: String,
    part2List: [{
        txbleTransaction: Number,
        atcCode: String,
        txbleAmt: Number,
        taxRate: Number,
        tax_due: Number,
        seqNo: Number
    }],
    sched1List: [{
        periodCovered: Date,
        name: String,
        incPymt: Number,
        taxWthld: Number,
        wthldAppliedCurr: Number,
        seqNo: Number
    }],
    dateFiled: Date,
    due_date: Date
});


module.exports = mongoose.model('2550q_forms', Form2550qSchema);