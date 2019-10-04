'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

var Form1701QSchema = new Schema({
    reference_no: String,
    dateFiled: {
        type: Date,
        default: new Date()
    },
    quarter: {
        type: Number,
        default: 0
    },
    amendedYn: Boolean,
    numOfSheet: {
        type: Number,
        default: 0
    },
    taxpayer: {
        taxpayer_name: String,
        tin: Number,
        rdo_code: Number,
        tax_filer_type: String,
        registered_address: String,
        birthday: Date,
        email_address: String,
        citizenship: String,
        foreign_tax_no: Number,
        spouse_tin: Number,
        spouse_rdo_code: Number,
        spouse_tax_filer_type: String,
        spouse_atc: {
            type: Number,
            default: 0
        },
        spouse_name: String,
        spouse_citizenship: String,
        spouse_foreign_tax_no: Number
    },
    dueDate: Date,
    returnPeriod: Date,
    returnPeriodMonth: String,
    returnPeriodYear: String,
    atc: {
        type: Number,
        default: 0
    },
    taxCredits: {
        type: Number,
        default: 0
    },
    taxRate: {
        type: Number,
        default: 0
    },
    method_deduction: {
        type: Number,
        default: 0
    },
    spouse_atc: {
        type: Number,
        default: 0
    },
    spouse_taxCredits: {
        type: Number,
        default: 0
    },
    spouse_taxRate: {
        type: Number,
        default: 0
    },
    spouse_method_deduction: {
        type: Number,
        default: 0
    },
    otherTaxCredits: {
        type: Number,
        default: 0
    },
    totalCredits: {
        type: Number,
        default: 0
    },
    amtPaybl: {
        type: Number,
        default: 0
    },
    surcharge: {
        type: Number,
        default: 0
    },
    interest: {
        type: Number,
        default: 0
    },
    compromise: {
        type: Number,
        default: 0
    },
    penalties: {
        type: Number,
        default: 0
    },
    totalAmountPayable: {
        type: Number,
        default: 0
    },
    batchNo: {
        type: Number,
        default: 0
    },
    sched1: [],
    sched2: [],
    sched3: [],
    sched4: [],
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

Form1701QSchema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1701QSchema.pre('findOneAndUpdate', function (callback) {
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


module.exports = mongoose.model('1701q_forms', Form1701QSchema);