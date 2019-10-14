'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

var Form1601CSchema = new Schema({
    reference_no: Number,
    due_date: Date,
    return_period: Date,
    return_period_month:String,
    return_period_year: String,
    amended_yn: Boolean,
    num_of_sheet: { type: Number, default: 0 },
    opn_yn: String,
    category_of_agent: String,
    atc: String, // WW010
    special_rate_yn: String, 
    international_treaty_yn: String,
    compensation: { type: Number, default: 0 }, //item14
    statutory_minimum_wage: { type: Number, default: 0 }, //item15
    minimum_wager: { type: Number, default: 0 },
    non_taxable_compensation: { type: Number, default: 0 }, //Sum of Items 15 to 20
    taxable_compensation: { type: Number, default: 0 }, //Item 14 Less Item 21
    tax_required: { type: Number, default: 0 },
    adjustment: { type: Number, default: 0 },  //From Part IV-Schedule 1, Item 4
    tax_required_remittance: { type: Number, default: 0 }, //Sum of Items 25 and 26
    tax_remitted: { type: Number, default: 0 },  //Sum of Items 28 and 29
    other_payments_made: { type: Number, default: 0 },
    total_payments_made: { type: Number, default: 0 },
    tax_due: { type: Number, default: 0 },  //Item 27 Less Item 30
    surcharge: { type: Number, default: 0 },
    interest: { type: Number, default: 0 },
    compromise: { type: Number, default: 0 },
    penalties: { type: Number, default: 0 },  //Sum of Items 32 to 34
    total_amount_payable: { type: Number, default: 0 }, //Sum of Items 31 and 35
    refund_type: String,
    adv_payment: { type: Number, default: 0 },
    total_tax_credits: { type: Number, default: 0 }, 
    if_overremittance: String,
    particular_cash: { type: Number, default: 0 },
    particular_check: { type: Number, default: 0 },
    particular_tax_debit: { type: Number, default: 0 },
    particular_others: { type: Number, default: 0 },
    sched1:[{
        previous_month: {
            type: Date,
            default: new Date()
        },
        date_paid: {
            type: Date,
            default: new Date()
        },
        drawee_bank: {
            type: Number,
            default: 0
        },
        number: {
            type: Number,
            default: 0
        },
        tax_paid: {
            type: Number,
            default: 0
        },
        Adjustments: {
            type: Number,
            default: 0
        }
    }],
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


Form1601CSchema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1601CSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('1601c_forms', Form1601CSchema);