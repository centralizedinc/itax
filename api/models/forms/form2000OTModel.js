"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
  atc_code: {
    type: String
  },
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
    sum1B2A: Number
  },
  stockName: String,
  stockTin: String,
  sharesSold: Number,
  stockCertNo: String,
  parValueShares: String,
  dstPaid: String,
  realPropertyTaxBase: Number,
  sharesStockTaxBase: Number,
  taxRate: String,
  prev_tax_due: Number,
  prev_tax_paid: Number
}

var Form2000OTSchema = new Schema({ ...common_model, ...model_schema });

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
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
  });


module.exports = mongoose.model("2000ot_forms", Form2000OTSchema);
