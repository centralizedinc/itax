'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentDetailsSchema = new Schema({
    reference_no: String,
    payment_conf_no: String,
    amount_payable: Number,
    amount_paid: Number,
    payment_date: Date,
    payment_method: String
});


module.exports = mongoose.model('payment_details', PaymentDetailsSchema);