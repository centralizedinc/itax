"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sequenceGenerator = require("mongoose-sequence-plugin");

var Form2000OTSchema = new Schema({
  referenceNo: Number,
  taxpayer: {},
  dateFiled: Date,
  dueDate: Date,
  returnPeriod: Date,
  returnPeriodMonth: String,
  returnPeriodYear: String,
  amendedYn: Boolean,
  numOfSheet: Number,
  atc: {
    code: String,
    description: String,
    rate: String
  },
  natureOfTransaction: String,
  seller: String,
  sellerTin: String,
  buyer: String,
  buyerTin: String,
  propertySold: String,
  locationOfRealProp: String,
  rdoRealProp: String,
  realPropertyClass: String,
  others: String,
  areaOfProperty: String,
  tctNo: String,
  taxDecNo: String,
  sellingPrice: Number,
  fairMarketValue: Number,
  schedule1: {
    commissionerLand: Number,
    commissionerImprovement: Number,
    commissionerTotal: Number,
    provincialLand: Number,
    provincialImprovement: Number,
    provincialTotal: Number,
    sum1A2B: Number,
    sum1B2A: Number,
    fairMarketValue: Number
  },
  stockName: String,
  stockTin: String,
  sharesSold: Number,
  stockCertNo: String,
  parValueShares: String,
  dstPaid: String,
  realPropertyTaxBase: Number,
  sharesStockTaxBase: Number,
  taxRate: Number,
  taxDue: Number,
  prevTaxPaid: Number,
  taxStillDue: Number,
  surcharge: Number,
  interest: Number,
  compromise: Number,
  penalties: Number,
  totalAmountPayable: Number
});

module.exports = mongoose.model("form_2000ot", Form2000OTSchema);