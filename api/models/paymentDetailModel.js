'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentDetailsSchema = new Schema({
    references: [],
    payment_conf_no: String,
    amount_payable: Number,
    amount_paid: Number,
    payment_date: {
        type: Date,
        default: new Date()
    },
    payment_method: String,
    payment_details: {},
    created_by: String
});


module.exports = mongoose.model('payment_details', PaymentDetailsSchema);