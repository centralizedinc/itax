'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Form1606Schema = new Schema({
    referenceNo: Number,
    returnPeriodYear: String,
    returnPeriodMonth: String,
    returnPeriod: String,
    amendedYn: Boolean,
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
    atcList: [{
        seqNo: Number,
        atcCode: String,
        payeeFlag: String,
        txbleAmt: Number,
        taxRate: Number,
        taxDue: Number,
        description: String
    }],
    dateFiled: Date,
    dueDate: Date
});


module.exports = mongoose.model('form_1606', Form1606Schema); 