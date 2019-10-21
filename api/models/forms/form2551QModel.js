'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    quarter: {
        type: Number
            /**
             * 1, 2, 3, 4
             */
    },
    year_type: {
        type: Date
    },
    year_ended_month: {
        type: Date
    },
    year_ended_year: {
        type: Date
    },
    sched1_tax_due: { type: Number, default: 0 }, //From Schedule 1 Item 7
    tax_withheld: { type: Number, default: 0 },
    prev_tax_paid: { type: Number, default: 0 },
    total_credits: { type: Number, default: 0 }, // Sum of Items 15 to 17
    refund_type: {
        type: String
    },
    particular_cash: [{
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
    particular_check: [{
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
    particular_tax_debit: [{
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
    particular_others: [{
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
    sched1: [{
        taxable_transaction: { type: Number, default: 0 },
        atc_code: String,
        taxable_amount: { type: Number, default: 0 },
        tax_rate: { type: Number, default: 0 },
        tax_due: { type: Number, default: 0 },
        total_amount_payable: { type: Number, default: 0 } //(Sum of Items 1 to 6)(To Part II Item 14)
    }],
};

var Form2551qSchema = new Schema({...common_model, ...model_schema });

Form2551qSchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form2551qSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form2551qSchema, '2551q_forms', options);
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


module.exports = mongoose.model('2551q_forms', Form2551qSchema);