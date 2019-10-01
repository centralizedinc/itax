"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taxpayerDetailsSchema = new Schema({
  user_id: Number,
  tin: String,
  branch_code: String,
  rdo_code: String,
  line_of_business: String,
  taxpayer_type: String,
  start_month: Number,
  accounting_type: String,
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
    birthDate: Date,
    civil_status: String,
    spouseTin: String,
    spouseBranchCode: String
  },
  corporate_details: {
    registeredName: String,
    incorporationDate: Date
  },
  registered_name: String
});

module.exports = mongoose.model("taxpayer_details", taxpayerDetailsSchema);
