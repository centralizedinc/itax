"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taxpayerDetailsSchema = new Schema({
  user_id: Number, // link to taxpayer account
  tin: String, // Tax Identification Number
  branch_code: String, // Branch Code
  rdo_code: String, // RDO Code
  line_of_business: String, // Line of Business
  taxpayer_type: String, // Individual || Non individual(Corporate)
  // if the forms is quarterly and set the accounting_type as fiscal, either start month or end month is required.
  start_month: { // start month of return period, use to get the quarterly months and end month of return period, must be use only in Quarterly Forms
    type: Number
  },
  end_month: { // end month of return period, use to get the quarterly months and start month of return period, must be use only in Quarterly Forms
    type: Number
  },
  // if the form didn't required a month or accounting_type, that means accounting_type is set as c or Calender else start_month or end_month is a mandatory field
  accounting_type: {
    type: String
    /**
     * c - calendar
     * f - fiscal
     */
  },
  filer_type: {
    type: String
    // single_proprietor - s,
    // professional - p,
    // estate - e,
    // trust - t,
    // employee - em
    // nranetb - n
  },
  address: String, //registered address
  address_details: {
    number: String,
    street: String,
    barangay: String,
    municipality: String,
    city: String,
    zipCode: Number
  },
  contact_details: {
    telno: String,
    mobile: String,
    email: String
  },
  individual_details: {
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    birthDate: Date,
    civil_status: String,
    /**
     * s - single
     * m - married
     * l - legally separated
     * w - widow/er
     */
    spouseTin: String,
    spouseBranchCode: String,
    citizenship: String,
    taxpayer_type: {
      type: String
      /**
       * Employee || Regular Rates - regular
       * NRANETB - nranetb
       */
    },
    address: String //residence address
  },
  date_incorporation: {
    type: Date
  },
  registered_name: String,
  created_by: {
    type: String
  },
  modified_by: {
    type: String
  },
  date_created: {
    type: Date,
    default: new Date()
  },
  date_modified: {
    type: Date,
    default: new Date()
  }
});

taxpayerDetailsSchema.pre('save', function (callback) {
  // this.date_created = new Date();
  this.date_modified = new Date();
  callback();
});

taxpayerDetailsSchema.pre('findOneAndUpdate', function (callback) {
  this.options.new = true;
  this.options.runValidators = true;
  this._update.date_modified = new Date();
  callback();
});

module.exports = mongoose.model("taxpayer_details", taxpayerDetailsSchema);