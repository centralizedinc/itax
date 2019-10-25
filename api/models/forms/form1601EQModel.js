'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
var common_model = require('./commonModels');

const model_schema = {
    any_tax_withheld: {
        type: Boolean
    },
    category_of_agent: {
        type: String
            /**
             * government
             * private
             */
    },
    // Part II Computation of Tax

    part2_atc_list: {
        type: String
    },
    part2_tax_base: {
        type: Number,
        default: 0
    },
    part2_tax_withheld: {
        total_taxes_withheld: { //Item 19 Sum of Items 13 to 18
            type: Number,
            default: 0
        },
        less_remittances_first_month: { //Item 20
            type: Number,
            default: 0
        },
        less_remittances_second_month: { //Item 21
            type: Number,
            default: 0
        },
        tax_remitted: { // item 22
            type: Number,
            default: 0
        },
        over_tax_remitted: { // item 23
            type: Number,
            default: 0
        },
        total_tax_remitted: { // item 24 Sum of items 20 to 23
            type: Number,
            default: 0
        },
        tax_overremittance: { // Item 25 - Item 19 less item 24
            type: Number,
            default: 0
        },
        total_amount_overremittance: { // item 30 Sum of items 25 to 29
            type: Number,
            default: 0
        },
    },
    if_overpayment: {
        type: String
            /**
             * 0 - to be refunded
             * 1 - to be issued a tax credit certificate
             * 2 - to be carried over as a tax credit for next year
             */
    },

    // Part III - Details of Payment
    particular_cash: [{ // item 31
        drawee_bank: {
            type: Number,
            default: 0
        },
        number: {
            type: Number,
            default: 0
        },
        date: {
            type: Date
        },
        amount: {
            type: Number,
            default: 0
        }
    }],
    particular_check: [{ // item 32
        drawee_bank: {
            type: Number,
            default: 0
        },
        number: {
            type: Number,
            default: 0
        },
        date: {
            type: Date
        },
        amount: {
            type: Number,
            default: 0
        }
    }],
    particular_tax_debit: [{ // item 33
        drawee_bank: {
            type: Number,
            default: 0
        },
        number: {
            type: Number,
            default: 0
        },
        date: {
            type: Date
        },
        amount: {
            type: Number,
            default: 0
        }
    }],
    particular_others: [{ // item 34
        drawee_bank: {
            type: Number,
            default: 0
        },
        number: {
            type: Number,
            default: 0
        },
        date: {
            type: Date
        },
        amount: {
            type: Number,
            default: 0
        }
    }]
};

var Form1601EQSchema = new Schema({
    ...common_model,
    ...model_schema
});

Form1601EQSchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1601EQSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1601EQSchema, '1601eq_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1601eq_forms', Form1601EQSchema);