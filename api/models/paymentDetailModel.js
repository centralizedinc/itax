'use strict'

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const Schema = mongoose.Schema;

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
    created_by: String,
    auto_id: {
        type: Number
    }
});


const options = {
    field: 'payment_conf_no', 
    incrementBy: 1, 
    nextCount: false, 
    startAt: 20190000000000,
    unique: false
};

const plugin = new autoIncrement(PaymentDetailsSchema, 'payment_details', options);

plugin.applyPlugin()
.catch(e => {
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('payment_details', PaymentDetailsSchema);