"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    taxRate: String,
    method_deduction: String,
    standardDeduction: String,
    tax_due: { type: Number, default: 0 }, //(From Part V, Schedule I-Item 46 OR Schedule II-Item 54)
    taxCredit: { type: Number, default: 0 }, //(From Part V, Schedule III-Item 62)
    taxPayable: { type: Number, default: 0 }, //(Item 26 Less Item 27) (From Part V, Item 63)
    totalPenalties: { type: Number, default: 0 }, //(From Part V, Schedule IV-Item 67)
    total_amount_payable: { type: Number, default: 0 }, // (Sum of Items 28 and 29) (From Part V, Item 68)
    aggregateAmountPayable: { type: Number, default: 0 }, //Sum of Items 30A and 30B
    particularCash: { type: Number, default: 0 },
    particularCheck: { type: Number, default: 0 },
    particularTaxDebit: { type: Number, default: 0 },
    particularOthers: { type: Number, default: 0 },
    sched1: [{
        totalSalesRevenue: { type: Number, default: 0 },
        totalSalesServices: { type: Number, default: 0 },
        grossIncome: { type: Number, default: 0 },
        totalAllowableItemizedDeductions: { type: Number, default: 0 },
        totalStandardDeductions: { type: Number, default: 0 }, //40% of Item 36
        totalNetIncome: { type: Number, default: 0 },
        totalTaxableIncome: { type: Number, default: 0 },
        totalOperationIncome: { type: Number, default: 0 },
        amountRecievedShare: { type: Number, default: 0 },
        totalTaxableIncomeToDate: { type: Number, default: 0 }, //Sum of Items 41 to 44
        totalTaxDue: { type: Number, default: 0 }, //(Item 45 x Applicable Tax Rate based on Tax Table below) (To Part III, Item 26)
    }],
    sched2: [{
        totalSalesRevenue: { type: Number, default: 0 },
        totalOperationIncome: { type: Number, default: 0 },
        totalIncomeQuarter: { type: Number, default: 0 }, // (Sum of Items 47 and 48)
        totalAllowableItemizedDeductions: { type: Number, default: 0 },
        totalStandardDeductions: { type: Number, default: 0 },
        totalNetIncome: { type: Number, default: 0 },
        totalCumulativeIncome: { type: Number, default: 0 }, //(Sum of Items 49 and 50)
        totalTaxableIncomeToDate: { type: Number, default: 0 }, //(Item 51 Less Item 52)
        totalTaxDue: { type: Number, default: 0 }, //(Item 53 x 8% Tax Rate) (To Part III, Item 26)
    }],
    sched3: [],
    sched4: [{
        surcharge: { type: Number, default: 0 },
        interest: { type: Number, default: 0 },
        compromise: { type: Number, default: 0 },
        penalties: { type: Number, default: 0 }, //(Sum of Items 64 to 66) (To Part III, Item 29)
        total_amount_payable: { type: Number, default: 0 }, //(Sum of Items 63 and 67) (To Part III, Item 30) 
    }]
};

var Form1701QSchema = new Schema({...common_model, ...model_schema });

Form1701QSchema.pre('save', function(callback) {
    this.date_created = new Date();
    this.date_modified = new Date();
    callback();
});

Form1701QSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1701QSchema, '1701q_forms', options);
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

module.exports = mongoose.model("1701q_forms", Form1701QSchema);