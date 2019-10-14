'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Form1601CSchema = new Schema({
    referenceNo: Number,
    taxpayer: {},
    dateFiled: Date,
    due_date: Date,
    return_period: Date,
    return_period_month:String,
    return_period_year: String,
    amended_yn: Boolean,
    num_of_sheet: Number,
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


module.exports = mongoose.model('1601c_forms', Form1601CSchema);