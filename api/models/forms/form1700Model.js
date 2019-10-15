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
    gr_gross_compensation_income: { type: Number, default: 0 },  //42 A
    gr_spouse_gross_compensation_income: { type: Number, default: 0 }, //42 B
    gr_non_taxable: { type: Number, default: 0 }, //43 A
    gr_spouse_non_taxable: { type: Number, default: 0 }, //43 B
    gr_gross_taxable: { type: Number, default: 0 }, //44 A
    gr_spouse_gross_taxable: { type: Number, default: 0 }, //44 B
    gr_other_taxable: { type: Number, default: 0 }, //45 A
    gr_spouse_other_taxable: { type: Number, default: 0 }, //45 B
    gr_tot_taxable_income: { type: Number, default: 0 },
    gr_spouse_tot_taxable_income: { type: Number, default: 0 },
    gr_tax_due: { type: Number, default: 0 },
    gr_spouse_tax_due: { type: Number, default: 0 },
    

    //Part V.B Flat Rate
    fr_gross_compensation_income: { type: Number, default: 0 },  //48 A
    fr_spouse_gross_compensation_income: { type: Number, default: 0 }, //48 B
    fr_non_taxable: { type: Number, default: 0 }, //49 A
    fr_spouse_non_taxable: { type: Number, default: 0 }, //49 B
    fr_gross_taxable: { type: Number, default: 0 }, //50 A
    fr_spouse_gross_taxable: { type: Number, default: 0 }, //50 B
    fr_other_taxable: { type: Number, default: 0 }, //51 A
    fr_spouse_other_taxable: { type: Number, default: 0 }, //51 B
    fr_tot_taxable_income: { type: Number, default: 0 }, //52 A
    fr_spouse_tot_taxable_income: { type: Number, default: 0 }, //52 B
    fr_tax_due: { type: Number, default: 0 }, //53 A
    fr_spouse_tax_due: { type: Number, default: 0 }, //53 B
    
    //Part V.C Tax Credit Payment
    tp_tax_wittheld: { type: Number, default: 0 }, //54 A
    tp__spousetax_wittheld: { type: Number, default: 0 },// 54 B
    tp_tax_paid_return:  { type: Number, default: 0 },// 55 A
    tp__spouse_tax_paid_return:  { type: Number, default: 0 },//55 B
    tp_foreign_tax_credit:  { type: Number, default: 0 },// 56 A
    tp__spouse_foreign_credit:  { type: Number, default: 0 },// 56 B
    tp_other_tax:  { type: Number, default: 0 },//57 A
    tp_spouse_other_tax:  { type: Number, default: 0 },//57 B
    tp_total_tax:  { type: Number, default: 0 },//58 A
    tp_spouse_total_tax:  { type: Number, default: 0 },//58 B
    tp_net_tax_payable:  { type: Number, default: 0 },//59 A
    tp_spouse_net_tax_payable:  { type: Number, default: 0 },//59 B

    //Part VI schedule
    sched1: [{
        filer_type: {
            type: String
            /**
             * taxpayer
             * spouse
             */
        },
        name_of_employer: String,
        employer_tin: String,
        comp_inc_sub_reg_grad: { type: Number, default: 0 },
        tax_withheld: { type: Number, default: 0 },
        // gros_comp_tot_tax_withld_taxpayer: { type: Number, default: 0 },
        // gros_comp_tot_tax_withld_spouse: { type: Number, default: 0 },
    }],
    taxpayer_regular_grad_total: { type: Number, default: 0 },
    taxpayer_flat_total: { type: Number, default: 0 },
    taxpayer_tax_withheld_total: { type: Number, default: 0 },
    spouse_regular_grad_total: { type: Number, default: 0 },
    spouse_flat_total: { type: Number, default: 0 },
    spouse_tax_withheld_total: { type: Number, default: 0 },
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