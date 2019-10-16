'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
var common_model = require('./commonModels');

const model_schema = {
    category_of_agent: {
        type: String
        /**
         * government
         * private
         */
    },
    // Part II Computation of Tax

    // schedule 1 1601EQ
    sched1: [{
        quarter: String,
        date_remittance: Date,
        drawee_Bank_Code: String,
        tra_ror_ar_num: {type: Number},
        tax_withheld: {type: Number, default: 0},
        penalties: {type: Number, default: 0},
        tot_amt_remitted: {type: Number, default: 0},
        total_tax_withheld: {type: Number, default: 0},
        total_penalties: {type: Number, default: 0},
        total_tot_amount_remitted: {type: Number, default: 0}
    }],

    //Schedule 2 1606
    sched2: [{
        quarter: String,
        date_remittance: Date,
        drawee_Bank_Code: String,
        tra_ror_ar_num: {type: Number},
        tax_withheld: {type: Number, default: 0},
        penalties: {type: Number, default: 0},
        tot_amt_remitted: {type: Number, default: 0},
        total_tax_withheld: {type: Number, default: 0},
        total_penalties: {type: Number, default: 0},
        total_tot_amount_remitted: {type: Number, default: 0}
    }],

     //Schedule 3
     sched3: [{
        seq_no: { type: Number, default: 0 }, //(1)
        tin: { type: Number },//(2)
        name: {
            first: { type: String },
            middle: { type: String }, //(3)
            last: { type: String }
        },
        atc_code: {
            type: String
        },
        
        amount: { type: Number, default: 0 },
        tax_rates: { type: Number, default: 0 },
        amt_of_tax_withheld: { type: Number, default: 0 },
        total_amount: { type: Number, default: 0 },
        total_amt_of_tax_withheld: { type: Number, default: 0 }
    }],

    //Schedule 4
    sched4: [{
        seq_no: { type: Number, default: 0 }, //(1)
        tin: { type: Number },//(2)
        name: {
            first: { type: String },
            middle: { type: String }, //(3)
            last: { type: String }
        },
        atc_code: {
            type: String
        },
        nature_act_payment: {type: String},
        amount: { type: Number, default: 0 },
    }],
};

var Form1604ESchema = new Schema({ ...common_model, ...model_schema });

Form1604ESchema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1604ESchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1604ESchema, '1604e_forms', options);
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


module.exports = mongoose.model('1604e_forms', Form1604ESchema);
