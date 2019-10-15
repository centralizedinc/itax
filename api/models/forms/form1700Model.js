'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
var common_model = require('./commonModels');

const model_schema = {

    prev_tax_due: { type: Number, default: 0 }, //26 Tax Due
    total_tax_credit: { type: Number, default: 0 }, //27 
    net_tax_payable: { type: Number, default: 0 }, //28  item26 Less Item 27
    portion_of_tax_payabe: { type: Number, default: 0 }, //29 
    total_amount_payable: { type: Number, default: 0 }, //35 sum of item 30 and 34
    aggregate_amount_payable: { type: Number, default: 0 }, //36 sum of item 35A and 35B

    //Page 2
    //Part V.A Graduate Rates
    grad_rates_gross_compensation_income: { type: Number, default: 0 },  //42 A
    grad_rates_spouse_gross_compensation_income: { type: Number, default: 0 }, //42 B
    grad_rates_non_taxable: { type: Number, default: 0 }, //43 A
    grad_rates_spouse_non_taxable: { type: Number, default: 0 }, //43 B
    grad_rates_gross_taxable: { type: Number, default: 0 }, //44 A
    grad_rates_spouse_gross_taxable: { type: Number, default: 0 }, //44 B
    grad_rates_other_taxable: { type: Number, default: 0 }, //45 A
    grad_rates_spouse_other_taxable: { type: Number, default: 0 }, //45 B
    grad_rates_tot_taxable_income: { type: Number, default: 0 },
    grad_rates_spouse_tot_taxable_income: { type: Number, default: 0 },
    grad_rates_tax_due: { type: Number, default: 0 },
    grad_rates_spouse_tax_due: { type: Number, default: 0 },
    

    //Part V.B Flat Rate
    flat_rate_gross_compensation_income: { type: Number, default: 0 },  //48 A
    flat_rate_spouse_gross_compensation_income: { type: Number, default: 0 }, //48 B
    flat_rate_non_taxable: { type: Number, default: 0 }, //49 A
    flat_rate_spouse_non_taxable: { type: Number, default: 0 }, //49 B
    flat_rate_gross_taxable: { type: Number, default: 0 }, //50 A
    flat_rate_spouse_gross_taxable: { type: Number, default: 0 }, //50 B
    flat_rate_other_taxable: { type: Number, default: 0 }, //51 A
    flat_rate_spouse_other_taxable: { type: Number, default: 0 }, //51 B
    flat_rate_tot_taxable_income: { type: Number, default: 0 }, //52 A
    flat_rate_spouse_tot_taxable_income: { type: Number, default: 0 }, //52 B
    flat_rate_tax_due: { type: Number, default: 0 }, //53 A
    flat_rate_spouse_tax_due: { type: Number, default: 0 }, //53 B
    
    //Part V.C Tax Credit Payment

    
};

var Form1700Schema = new Schema({ ...common_model, ...model_schema });

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