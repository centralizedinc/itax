'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
var common_model = require('./commonModels');

const model_schema = {
    any_tax_withheld: { type: Boolean },
    category_of_agent: {
        type: String
        /**
         * government
         * private
         */
    },
    // Part II Computation of Tax

    atc_list: [{
        nature_of_income_payment: String,
        atc_code: String,
        tax_base: { type: Number, default: 0 },
        tax_rate: { type: Number, default: 0 },
        tax_withheld: { type: Number, default: 0 }
    }],
    tax_req_withld_remtd: { type: Number, default: 0 },
    less_tax_remtd_retrn: { type: Number, default: 0 },
    tax_due: { type: Number, default: 0 },
    total_amount_payable: { type: Number, default: 0 },

    //Schedule 1.1
    sched1: [{
        seq_no: { type: Number, default: 0 }, //(1)
        tin: { type: Number },//(2)
        name: {
            first: { type: String },
            middle: { type: String }, //(3)
            last: { type: String }
        },
        atc_code: {
            type: String
            /*
                atc code
                WB 191
                WB 192
                WB 193
                WB 194
            */

        },
        nature_of_payment: { type: Number, default: 0 },
        amount: { type: Number, default: 0 },
        tax_rates: { type: Number, default: 0 },
        tax_req_withheld: { type: Number, default: 0 },
    }],

    total_tax_req_withheld: { type: Number, default: 0 },
    total_amount: { type: Number, default: 0 }
};

var Form1600WPSchema = new Schema({ ...common_model, ...model_schema });

Form1600WPSchema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1600WPSchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1600WPSchema, '1600wp_forms', options);
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


module.exports = mongoose.model('1600wp_forms', Form1600WPSchema);
