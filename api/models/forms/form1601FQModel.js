'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
   
    taxes_withheld: { type: Boolean },
    category_of_agent: { 
        type: String
        /**
         * government
         * private
         */
    },
    // Part II computation of tax
    atc_list: [{
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
    tax_withheld_reg_rate: { type: Number, default: 0}, // item20 Sum of items 14 to 19
    tax_withheld_tax_treaty_rates: { type: Number, default: 0}, //item21 from part IV-schedule 1
    tot_tax_withheld_quarter: { type: Number, default: 0}, // item22 Sum of items 20 and 21
    remittance_made_first: { type: Number, default: 0}, //item23
    remittance_made_second: { type: Number, default: 0}, //item24
    tot_tax_remittance_prev: { type: Number, default: 0}, //item25
    tot_remittance_made: { type: Number, default: 0}, //item26 sum of items 23 to 25
    tax_due: { type: Number, default: 0}, //item27 item 22 less item 26
    total_amount_due: { type: Number, default: 0}, //item32 Sum of items 27 and 31

    sched1:[{
        seq_no: { type: Number, default: 0},
        treaty_code: {
            type: String,
        /**
         * treaty code w/
         * country
         */
        },
        atc_code: {
            type: String,
          /**
         * 
         * 
         */  
        },
        nature_of_income: {type: String},
        amount_income_payment: { type: Number, default: 0},
        tax_rate: { type: Number, default: 0},
        tax_withheld: { type: Number, default: 0},
        tot_tax_withheld: { type: Number, default: 0},
    }],
};

var Form1601FQSchema = new Schema({ ...common_model, ...model_schema });


Form1601FQSchema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1601FQSchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1601FQSchema, '1601fq_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
        // Plugin failed to initialise
        console.log("############### init failed: " + e);
    });


module.exports = mongoose.model('1601fq_forms', Form1601FQSchema);