'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

var Form1700Schema = new Schema({
    reference_no: String,
    dateFiled: {
        type: Date,
        default: new Date()
    },
    return_period_year: String,
    return_period: {type: Date, default: new Date()},
    amended_yn: Boolean,

    taxpayer: {},
    spouse_taxpayer: {},

    prev_tax_due: { type: Number, default: 0 }, //26 Tax Due
    // total_tax_credit: { type: Number, default: 0 }, //27
    net_tax_payable: { type: Number, default: 0 }, //28  item26 Less Item 27
    portion_of_tax_payabe: { type: Number, default: 0 }, //29 
    tax_due: { type: Number, default: 0 }, //30 Item 28 less Item 29

    //penalties
    surcharge: { type: Number, default: 0 }, 
    interest: { type: Number, default: 0 }, 
    compromise: { type: Number, default: 0 }, 
    penalties: { type: Number, default: 0 }, // 34 Sum of item 31 to 33

    total_amount_payable: { type: Number, default: 0 }, //35 sum of item 30 and 34
    aggregate_amount_payable: { type: Number, default: 0 }, //36 sum of item 35A and 35B
    num_of_sheet: { type: Number, default: 0 }, //37 no of attachments

    //Page 2

    
    // joint_filing: Boolean,

    // source_of_income: "",
    // 0 - Compensation Income
    // 1 - Other Income
    

    // dueDate: Date,
    // returnPeriod: Date,
    // returnPeriodMonth: String,
    // returnPeriodYear: String,
    // amendedYn: Boolean,
    // numOfSheet: { type: Number, default: 0 },


    tax_filer_tax_due: { type: Number, default: 0 },
    spouse_tax_due: { type: Number, default: 0 },
    total_income_tax_due: { type: Number, default: 0 },
    less_tax_credits: { type: Number, default: 0 },
    spouse_less_tax_credits: { type: Number, default: 0 },
    net_tax_payable: { type: Number, default: 0 },
    portion_tax_payable: { type: Number, default: 0 },
    total_penalties: { type: Number, default: 0 },
    total_amount_payable: { type: Number, default: 0 },
    // atc: { type: Number, default: 0 }, 
    // taxCredits: { type: Number, default: 0 },
    // taxRate: { type: Number, default: 0 },
    // method_deduction: { type: Number, default: 0 },
    // spouse_atc: { type: Number, default: 0 },
    // spouse_taxCredits: { type: Number, default: 0 },
    // spouse_taxRate: { type: Number, default: 0 },
    // spouse_method_deduction: { type: Number, default: 0 },
    // otherTaxCredits: { type: Number, default: 0 },
    // totalCredits: { type: Number, default: 0 },
    // amtPaybl: { type: Number, default: 0 },
    // surcharge: { type: Number, default: 0 },
    // interest: { type: Number, default: 0 },
    // compromise: { type: Number, default: 0 },
    // penalties: { type: Number, default: 0 },
    // total_amount_payable: { type: Number, default: 0 },
    // batchNo: { type: Number, default: 0 },
    // sched1: [],
    // sched2: [],
    // sched3: [],
    // sched4: [],
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

Form1700Schema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1700Schema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1700Schema, '1700_forms', options);
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


module.exports = mongoose.model('1700_forms', Form1700Schema);