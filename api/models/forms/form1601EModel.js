'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

var Form1601ESchema = new Schema({
    category_of_agent: String,
    taxes_withheld: Boolean,
    total_tax_withheld_remitted: {
        type: Number,
        default: 0
    },
    // 16
    tax_overrimittance:{
        type: Number,
        default: 0
    },
    over_remittance: Boolean,
    // 18
    total_amount_overremittance:{
        type: Number,
        default: 0
    },
    // 14
    amt_due_crdtb: {
        type: Number,
        default: 0
    },
    // 15
    prev_tax_paid_crdtb: {
        type: Number,
        default: 0
    },
    // 16
    amt_paybl_crdtb: {
        type: Number,
        default: 0
    },
    // 17a
    surcharge: { 
        type: Number,
        default: 0
    },
    total_amt_paybl_crdtb: {
        type: Number,
        default: 0
    },
    refund_type: String,
    // 15b
    adv_payment: {
        type: Number,
        default: 0
    },
    // 15c
    tot_tax_credits: {
        type: Number,
        default: 0
    },
    if_over_remittance: String,
    atc_list: [{
        nature_of_income: String,
        atc_code: {
            type: String
        },
        tax_base: {
            type: Number,
            default: 0
        },
        tax_rate: {
            type: Number,
            default: 0
        },
        tax_withheld: {
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

Form1601ESchema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1601ESchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1601ESchema, '1601e_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin()
    .then(() => {
        console.log("############### init plugin")
    })
    .catch(e => {
        // Plugin failed to initialise
        console.log("############### init failed: " + e);
    });

module.exports = mongoose.model('1601e_forms', Form1601ESchema);