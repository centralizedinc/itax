'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    reference_no: Number,
    // common
    // taxpayer: {},
    // date_filed: {type: Date, default: new Date()},
    // due_date: {type: Date, default: new Date()},
    // return_period: {type: Date, default: new Date()},
    // return_period_month:String,
    // return_period_year: String,
    // amended_yn: Boolean,
    // num_of_sheet: { type: Number, default: 0 },
    // opn_yn: String,
    // category_of_agent: String,
    // special_rate_yn: String,
    // international_treaty_yn: String,
    atc_list:[{
        nature_of_income_payment: String,
        atc_code: String,
        tax_base: { type: Number, default: 0 },
        tax_rate: { type: Number, default: 0 },
        tax_withheld: { type: Number, default: 0 }        
    }],
    // total_final_wthld: { type: Number, default: 0 },
    sched_list: [{
        treaty_code: String,
        atc: String,
        amt_income_payment: { type: Number, default: 0 },
        tax_rates: { type: Number, default: 0 },
        tax_req_withheld: { type: Number, default: 0 },
        total: { type: Number, default: 0 }
    }],
    tax_wthld_under_treaty: String, //14 Regular rates
    tot_schedule1: { type: Number, default: 0 }, //15 (form schedule 1)
    amt_due_final: { type: Number, default: 0 }, //16 (sum of items 14 and 15)
    prev_tax_paid_final: { type: Number, default: 0 }, //17 (Less: Tax Remitted in return previously Filed)
    // common
    // tax_due: { type: Number, default: 0 },//18 overremittance
    // surcharge: { type: Number, default: 0 },//19A
    // interest: { type: Number, default: 0 },//19B
    // compromise: { type: Number, default: 0 },//19C
    // penalties: { type: Number, default: 0 },//19D total penalties
    // total_amt_paybl: { type: Number, default: 0 }//20 (Sum of item 18 and 19D)
    
}; 

var Form1601FSchema = new Schema({ ...common_model, ...model_schema });


Form1601FSchema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1601FSchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1601FSchema, '1601f_forms', options);
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


module.exports = mongoose.model('1601f_forms', Form1601FSchema);