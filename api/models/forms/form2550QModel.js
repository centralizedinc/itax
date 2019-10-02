'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Form2550qSchema = new Schema({
    referenceNo: Number,
    test:Boolean,
    yearType: String,
    yearEndedMonth: String,
    yearEndedYear: String,
    returnPeriodMonth: String,
    returnPeriodYear: String,
    returnPeriod: String,
    amendedYn: Boolean,
    numSheets: Number,
    taxpayer: {},
    accountingType: Boolean,
    specialRateFlag: Boolean,
    internationalTreatyFlag: Boolean,
    taxDue: Number,
    taxWithheld: Number,
    prevTaxPaid: Number,
    totalCredits: Number,
    amountPayable: Number,
    surcharge: Number,
    interest: Number,
    compromise: Number,
    penalties: Number,
    totalAmountPayable: Number,
    refundType: String,
    part2List: [{
        txbleTransaction: Number,
        atcCode: String,
        txbleAmt: Number,
        taxRate: Number,
        taxDue: Number,
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
    dueDate: Date
});


module.exports = mongoose.model('form_2550q', Form2550qSchema);