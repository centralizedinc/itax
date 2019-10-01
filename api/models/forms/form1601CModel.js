'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Form1601CSchema = new Schema({
    referenceNo: Number,
    taxpayer: {},
    dateFiled: Date,
    dueDate: Date,
    returnPeriod: Date,
    returnPeriodMonth:String,
    returnPeriodYear: String,
    amendedYn: Boolean,
    numOfSheet: Number,
    opnYn: String,
    categoryOfAgent: String,
    atc: String,
    specialRateYn: String,
    internationalTreatyYn: String,
    compensation: Number,
    statutoryMinimumWage: Number,
    minimumWager: Number,
    nonTaxableCompensation: Number,
    taxableCompensation: Number,
    taxRequired: Number,
    adjustment: Number,
    taxRequiredRemittance: Number,
    taxRemitted: Number,
    otherPaymentsMade: Number,
    totalPaymentsMade: Number,
    taxStillDue: Number,
    surcharge: Number,
    interest: Number,
    compromise: Number,
    penaltiesCrdtb: Number,
    totalAmtPayblCrdtb: Number,
    refundType: String,
    advPayment: Number,
    totTaxCredits: Number,
    ifOverremittance: String,
    sectionA:[{
// 1
// 2
// 3
// 4
    }],
    sectionB:[{
    // 1
// 2
// 3
// 4
    }]
});


module.exports = mongoose.model('form_1601c', Form1601CSchema);