'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Form1601FSchema = new Schema({
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
    specialRateYn: String,
    internationalTreatyYn: String,

    // amtDueCrdtb: Number,
    // prevTaxPaidCrdtb: Number,
    // amtPayblCrdtb: Number,
    // surcharge: Number,
    // interest: Number,
    // compromise: Number,
    // penaltiesCrdtb: Number,
    // totalAmtPayblCrdtb: Number,
    // refundType: String,

    // advPayment: Number,
    // totTaxCredits: Number,
    // ifOverremittance: String,
    atcList:[{
        natureOfIncomePayment: String,
        atcCode: String,
        taxBase: Number,
        taxRate: Number,
        taxWithheld: Number        
    }],
    totalFinalWthld: Number,
    schedList: [{
        treatyCode: String,
        atc: String,
        amtIncomePayment: Number,
        taxRates: Number,
        taxReqWithheld: Number,
        total: Number
    }],
    taxWthldUnderTreaty: String,
    totSchedule1: Number,
    amtDueFinal: Number,
    prevTaxPaidFinal: Number,
    amtPayblFinal: Number,
    surcharge: Number,
    interest: Number,
    compromise: Number,
    penalties: Number,
    totalAmtPaybl: Number
    
});


module.exports = mongoose.model('form_1601f', Form1601FSchema);