"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taxpayerDetailsSchema = new Schema({
  user_id: Number,
  tin: String,
  branch_code: String,
  rdo_code: String,
  line_of_business: String,
  taxpayer_type: String, // Individuals || Non individuals
  start_month: Number,
  accounting_type: {
    type: String
    /**
     * c - calendar
     * f - fiscal
     */
  },
  filer_type: {
    type: String
    // single_proprietor,
    // professional,
    // estate,
    // trust
  },
  address: String,
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
    }
  },
  corporate_details: {
    registeredName: String,
    incorporationDate: Date
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
  this.date_created = new Date();
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