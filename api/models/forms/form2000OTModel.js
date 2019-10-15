"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
// var sequenceGenerator = require("mongoose-sequence-plugin");

var Form2000OTSchema = new Schema({
  referenceNo: Number,
  taxpayer: {},
  dateFiled: Date,
  // transactionDate: {
  //   type: Date,
  //   default: new Date()
  // },
  amended_yn: Boolean,
  num_of_sheet: { type: Number, default: 0 },
  atc: {
    code: String,
    description: String,
    rate: String
  },
  due_date: Date,
  return_period: Date,
  return_period_month: String,
  return_period_year: String,
  natureOfTransaction: {
    type: String
    /**
     * real_property_capital
     * real_property_ordinary
     * shares_stock
     */
  },
  seller: String,
  sellerTin: String,
  buyer: String,
  buyerTin: String,
  propertySold: String,
  locationOfRealProp: String,
  rdoRealProp: String,
  realPropertyClass: {
    type: String
    /**
     * residential
     * agricultural
     * commercial
     * industrial
     * condo_residential
     * condo_commercial
     * others
     */
  },
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
  prev_tax_due: Number,
  prevTaxPaid: Number,
  tax_due: {
    type: Number,
    default: 0
  },
  surcharge: Number,
  interest: Number,
  compromise: Number,
  penalties: Number,
  total_amount_payable: Number,
  date_created: {
    type: Date,
    default: new Date()
  },
  date_modified: {
    type: Date,
    default: new Date()
  },
  auto_id: {
    type: Number
  },
  created_by: {
    type: String
  },
  modified_by: {
    type: String
  }
});

Form2000OTSchema.pre('save', function (callback) {
  var form = this;
  form.date_created = new Date();
  form.date_modified = new Date();
  callback();
});

Form2000OTSchema.pre('findOneAndUpdate', function (callback) {
  console.log('this :', this._update);
  this.options.new = true;
  this.options.runValidators = true;
  this._update.date_modified = new Date();
  callback();
});

const options = {
  field: 'auto_id', // auto_id will have an auto-incrementing value
  incrementBy: 1, // incremented by 2 every time
  nextCount: false, // Not interested in getting the next count - don't add it to the model
  // resetCount: 'reset', // The model and each document can now reset the counter via the reset() method
  startAt: 0, // Start the counter at 1000
  unique: false // Don't add a unique index
};

const plugin = new autoIncrement(Form2000OTSchema, '2000ot_forms', options);
plugin.applyPlugin()
  .then(() => {
    console.log("############### init plugin")
  })
  .catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
  });


module.exports = mongoose.model("2000ot_forms", Form2000OTSchema);
