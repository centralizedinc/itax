'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

var Form1601ESchema = new Schema({
    reference_no: {
        type: Number
    },
    taxpayer: {},
    dateFiled: Date,
    due_date: Date,
    returnPeriod: Date,
    returnPeriodMonth: String,
    returnPeriodYear: String,
    amendedYn: Boolean,
    numOfSheet: {
        type: Number,
        default: 0
    },
    opnYn: String,
    categoryOfAgent: String,
    specialRateYn: String,
    internationalTreatyYn: String,
    taxes_withheld: Boolean,
    availing_tax_relief: Boolean,
    // 14
    total_tax_withheld_remitted: {
        type: Number,
        default: 0
    },
    // 16
    tax_overrimittance:{
        type: Number,
        default: 0
    },
    overremittance: Boolean,
    // 18
    total_amount_overremittance:{
        type: Number,
        default: 0
    },
    amtDueCrdtb: {
        type: Number,
        default: 0
    },
    // 15a
    prevTaxPaidCrdtb: {
        type: Number,
        default: 0
    },
    amtPayblCrdtb: {
        type: Number,
        default: 0
    },
    // 17a
    surcharge: { 
        type: Number,
        default: 0
    },
    // 17b
    interest: {
        type: Number,
        default: 0
    },
    // 17c
    compromise: {
        type: Number,
        default: 0
    },
    // 17D
    penaltiesCrdtb: {
        type: Number,
        default: 0
    },
    totalAmtPayblCrdtb: {
        type: Number,
        default: 0
    },
    refundType: String,
    // 15b
    advPayment: {
        type: Number,
        default: 0
    },
    // 15c
    totTaxCredits: {
        type: Number,
        default: 0
    },
    ifOverremittance: String,
    atcList: [{
        seqNo: {
            type: Number,
            default: 0
        },
        atcCode: String,
        payeeFlag: String,
        txbleAmt: {
            type: Number,
            default: 0
        },
        taxRate: {
            type: Number,
            default: 0
        },
        taxDue: {
            type: Number,
            default: 0
        },
        description: String
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

module.exports = mongoose.model('form_1601e', Form1601ESchema);