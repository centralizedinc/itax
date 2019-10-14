'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Form2551qSchema = new Schema({
    reference_no: Number,
    year_type: String,
    year_ended_month: String,
    year_ended_year: String,
    return_period_month: String,
    return_period_year: String,
    return_period: String,
    amended_yn: Boolean,
    num_of_sheet: { type: Number, default: 0 },
    accounting_type: Boolean,
    special_rate_flag: Boolean,
    international_treaty_flag: Boolean,
    tax_due: { type: Number, default: 0 },  //From Schedule 1 Item 7
    tax_withheld: { type: Number, default: 0 },
    prev_tax_paid: { type: Number, default: 0 },
    total_credits: { type: Number, default: 0 }, // Sum of Items 15 to 17
    amount_payable: { type: Number, default: 0 },
    surcharge: { type: Number, default: 0 },
    interest: { type: Number, default: 0 },
    compromise: { type: Number, default: 0 },
    penalties: { type: Number, default: 0 }, //Sum of Items 20 to 22
    total_amount_payable: { type: Number, default: 0 }, //Sum of Items 19 and 23
    refund_type: String,
    sched1: [{
        taxable_transaction: { type: Number, default: 0 },
        atc_code: String,
        taxable_amtount: { type: Number, default: 0 },
        tax_rate: { type: Number, default: 0 },
        tax_due: { type: Number, default: 0 },
        seq_no: { type: Number, default: 0 }
    }],
    date_filed: Date,
    due_date: Date
});

Form2551qSchema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form2551qSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});


module.exports = mongoose.model('2551q_forms', Form2551qSchema);