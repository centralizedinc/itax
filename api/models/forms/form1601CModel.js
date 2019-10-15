'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    opn_yn: String,
    category_of_agent: String,
    atc: String, // WW010
    compensation: { type: Number, default: 0 }, //item14
    statutory_minimum_wage: { type: Number, default: 0 }, //item15
    minimum_wager: { type: Number, default: 0 },
    non_taxable_compensation: { type: Number, default: 0 }, //Sum of Items 15 to 20
    taxable_compensation: { type: Number, default: 0 }, //Item 14 Less Item 21
    tax_required: { type: Number, default: 0 },
    adjustment: { type: Number, default: 0 }, //From Part IV-Schedule 1, Item 4
    tax_required_remittance: { type: Number, default: 0 }, //Sum of Items 25 and 26
    tax_remitted: { type: Number, default: 0 }, //Sum of Items 28 and 29
    other_payments_made: { type: Number, default: 0 },
    total_payments_made: { type: Number, default: 0 },
    refund_type: String,
    adv_payment: { type: Number, default: 0 },
    total_tax_credits: { type: Number, default: 0 },
    if_overremittance: String,
    particular_cash: { type: Number, default: 0 },
    particular_check: { type: Number, default: 0 },
    particular_tax_debit: { type: Number, default: 0 },
    particular_others: { type: Number, default: 0 },
    sched1: [{
        previous_month: {
            type: Date,
            default: new Date()
        },
        date_paid: { //(Excluding Penalties for the Month)
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
};

var Form1601CSchema = new Schema({...common_model, ...model_schema });

Form1601CSchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1601CSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1601CSchema, '1601c_forms', options);
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


module.exports = mongoose.model('1601c_forms', Form1601CSchema);