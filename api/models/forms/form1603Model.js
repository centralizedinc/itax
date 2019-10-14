'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Form1603Schema = new Schema({
    reference_no: Number,
    return_period_year: String,
    return_period_month: String,
    return_period: String,
    quarter: String,
    amended_yn: Boolean,
    opn_yn: String,
    reflected: String,
    category_of_agent: String,
    opt_treaty: String,
    special_rate_yn: String,
    international_treaty_yn: String,
    monetary_value: { type: Number, default: 0 },
    taxable_amount: { type: Number, default: 0 },
    compute_monetary_value: { type: Number, default: 0 },
    compute_tax_due: { type: Number, default: 0 },
    percentage_divisor: { type: Number, default: 0 },
    tax_due: { type: Number, default: 0 },
    total_payments_made: { type: Number, default: 0 },
    other_payments_made: { type: Number, default: 0 },
    surcharge: { type: Number, default: 0 },
    interest: { type: Number, default: 0 },
    compromise: { type: Number, default: 0 },
    penalties: { type: Number, default: 0 },
    total_amount_payable: Number,
    refund_type: String,
    adv_payment: { type: Number, default: 0 },
    total_tax_credits: { type: Number, default: 0 },
    if_overremittance: String,
    atcList: [{
        seq_no: { type: Number, default: 0 },
        atc_code: String,
        payee_flag: String,
        taxable_amount: { type: Number, default: 0 },
        tax_rate: { type: Number, default: 0 },
        tax_due: { type: Number, default: 0 },
        description: String
    }],
    date_filed: Date,
    due_date: Date,
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


Form1603Schema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1603Schema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('1603_forms', Form1603Schema);