/**
 * 
 * @description FORM 1600 (September 2005)
 * @author Mark
 * @base_form https://www.bir.gov.ph/images/bir_files/old_files/pdf/268811600%20final.pdf
 * @version 1.0 - 10/30/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    // `any taxes withheld`. can be found at common model
    category_of_agent: { // item 12
        type: String
        /**
         * government
         * private
         */
    },


    // Part II - Computation of Tax
    prev_tax_due: {
        type: Number
    },
    prev_tax_paid: {
        type: Number
    },

    
    sched1: [{
        description: { // Nature of Income Payment
            type: String
        },
        atc_code: { // ATC
            type: String
        },
        tax_base: { // Tax Base
            type: Number
        },
        tax_rate: { // Tax Rate
            type: Number
        },
        tax_withheld: { // Tax Required to be withheld
            type: Number
        }
    }],
    // Alphabetical list of payees
    sched2: [{
        // Payee Details
        tin: { // TIN
            type: String
        },
        registered_name: { // Individual/Corporation
            type: String
        },
        // Income payment/ Tax Withheld details
        description: { // Nature of Income Payment
            type: String
        },
        atc_code: { // ATC
            type: String
        },
        tax_base: { // Tax Base
            type: Number
        },
        tax_rate: { // Tax Rate
            type: Number
        },
        tax_withheld: { // Tax Required to be withheld
            type: Number
        }
    }]
};

var Form1600Schema = new Schema({ ...common_model, ...model_schema });

Form1600Schema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1600Schema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1600Schema, '1600_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1600_forms', Form1600Schema);