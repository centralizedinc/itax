'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Form1603Schema = new Schema({
    referenceNo: Number,
    return_period_year: String,
    return_period_month: String,
    return_period: String,
    quarter: String,
    amended_yn: Boolean,
    opnYn: String,
    reflected: String,
    taxpayer: {},
    categoryOfAgent: String,
    optTreaty: String,
    specialRateYn: String,
    internationalTreatyYn: String,
    monetaryValue: Number,
    taxbleAmt: Number,
    ComputeMonetaryValue: Number,
    computeTaxDue: Number,
    percentDivStr: Number,
    amtDueCrdtb: Number,
    prevTaxPidCrdtb: Number,
    amtPayblCrdtb: Number,
    surcharge: Number,
    interest: Number,
    compromise: Number,
    penaltiesCrdtb: Number,
    totalAmtPayblCrdtb: Number,
    refundType: String,
    advPayment: Number,
    totTaxCredits: Number,
    ifOverremittance: String,
    // atcList: [{
    //     seqNo: Number,
    //     atcCode: String,
    //     payeeFlag: String,
    //     txbleAmt: Number,
    //     taxRate: Number,
    //     tax_due: Number,
    //     description: String
    // }],
    dateFiled: Date,
    due_date: Date
});


module.exports = mongoose.model('1603_forms', Form1603Schema); 