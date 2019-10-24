"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    year_type: {
        type: Date
    },
    year_ended_month: {
        type: Date
    },
    year_ended_year: {
        type: Date
    },
    short_period_return: {
        type: Boolean
    },
    atc_code: {
        type: String
            // IC055,
            // IC010,
            // IC020,
            // IC040,
            // IC041,
            // IC070
    },
    date_incorporation_organization: {
        type: Date
    }, //item10
    method_deduction: {
        type: String
            // itemized_deduction,
            // optional_standard_deduction
    },

    //Part 2 Total tax payable
    total_tax_due: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule I-Item 46 OR Schedule II-Item 54) 26a
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
    // Part V Graduated IT Rate
    sched1: [],
    // Part V IT Rate
    sched2: [],
    // Part V Tax Credits/Payments
    sched3: [],
    // Part V Penalties
    sched4: []
};

var Form1702RTSchema = new Schema({
    ...common_model,
    ...model_schema
});

Form1702RTSchema.pre('save', function(callback) {
    this.date_created = new Date();
    this.date_modified = new Date();
    callback();
});

Form1702RTSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1702RTSchema, '1702rt_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});

module.exports = mongoose.model("1702rt_forms", Form1702RTSchema);