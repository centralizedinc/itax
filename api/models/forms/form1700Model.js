'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
var common_model = require('./commonModels');

const model_schema = {

    atc_code: { type: String }, //3
    claiming_foreign_tax_credit: { type: Boolean }, //12
    foreign_tax_number: { type: Number }, //13
    spouse_has_income: {
        type: Boolean
    },
    filing_status: {
        type: String
        /**
         * joint
         * separate
         */
    },

    // Part III total tax payable
    total_tax_payable: [{
        taxpayer: {
            prev_tax_due: { type: Number, default: 0 }, //26A
            total_tax_credit: { type: Number, default: 0 }, //27A
            net_tax_payable: { type: Number, default: 0 }, //28A
            portion_of_tax_payabe: { type: Number, default: 0 }, //29A
            amount_tax_payable: { type: Number, default: 0 }, //Item 30A
            surcharge: { type: Number, default: 0 }, //Item 31A
            interest: { type: Number, default: 0 }, //Item 32A
            compromise: { type: Number, default: 0 }, //Item 33A
            total_penalties: { type: Number, default: 0 }, //Item 34A
            total_amount_payable: { type: Number, default: 0 }, //Item 35A
        },
        taxpayer_spouse: {
            prev_tax_due: { type: Number, default: 0 }, //26B
            total_tax_credit: { type: Number, default: 0 }, //27B
            net_tax_payable: { type: Number, default: 0 }, //28B
            portion_of_tax_payabe: { type: Number, default: 0 }, //29B
            amount_tax_payable: { type: Number, default: 0 }, //Item 30B
            surcharge: { type: Number, default: 0 }, //Item 31B
            interest: { type: Number, default: 0 }, //Item 32B
            compromise: { type: Number, default: 0 }, //Item 33B
            total_penalties: { type: Number, default: 0 }, //Item 34B
            total_amount_payable: { type: Number, default: 0 }, //35B
        },
        aggregate_amount_payable: { type: Number, default: 0 }, //36
    }],

    //Page 2
    //Part V.A Graduate Rates

    graduated_rates: [{
        desc_specify: {type: String}, //45
        taxpayer: {
            gross_compensation_income: { type: Number, default: 0 },  //42 A
            non_taxable: { type: Number, default: 0 }, //43 A
            gross_taxable: { type: Number, default: 0 }, //44 A
            other_taxable: { type: Number, default: 0 }, //45 A

            tot_taxable_income: { type: Number, default: 0 }, //46 A
            tax_due: { type: Number, default: 0 }, //47 A
        },

        taxpayer_spouse: {
            gross_compensation_income: { type: Number, default: 0 },  //42 B
            non_taxable: { type: Number, default: 0 }, //43 B
            gross_taxable: { type: Number, default: 0 }, //44 B
            other_taxable: { type: Number, default: 0 }, //45 B

            tot_taxable_income: { type: Number, default: 0 }, //46 B
            tax_due: { type: Number, default: 0 }, //47 B
        }

    }],

    //Part V.B Flat Rate

    flat_rate: [{
        desc_specify_non_tax: {type: String}, //49
        desc_specify_other_tax: {type: String}, //51
        taxpayer: {
            gross_compensation_income: { type: Number, default: 0 },  //48 A
            non_taxable: { type: Number, default: 0 }, //49 A

            gross_taxable: { type: Number, default: 0 }, //50 A

            other_taxable: { type: Number, default: 0 }, //51 A
            tot_taxable_income: { type: Number, default: 0 }, //52 A
            tax_due: { type: Number, default: 0 }, //53 A
        },
        spouse_taxpayer: {
            gross_compensation_income: { type: Number, default: 0 },  //48 B
            non_taxable: { type: Number, default: 0 }, //49 B

            gross_taxable: { type: Number, default: 0 }, //50 B

            other_taxable: { type: Number, default: 0 }, //51 B
            tot_taxable_income: { type: Number, default: 0 }, //52 B
            tax_due: { type: Number, default: 0 }, //53 B
        }
    }],



    //Part V.C Tax Credit Payment

    tax_credit_payment: {
        desc_specify: {type: String}, //57
        taxpayer: {
            tax_wittheld: { type: Number, default: 0 }, //54 A
            tax_paid_return: { type: Number, default: 0 },// 55 A
            foreign_tax_credit: { type: Number, default: 0 },// 56 A
            other_tax: { type: Number, default: 0 },//57 A

            total_tax: { type: Number, default: 0 },//58 A
            net_tax_payable: { type: Number, default: 0 },//59 A
        },
        spouse_taxpayer: {
            tax_wittheld: { type: Number, default: 0 }, //54 B
            tax_paid_return: { type: Number, default: 0 },// 55 B
            foreign_tax_credit: { type: Number, default: 0 },// 56 B
            other_tax: { type: Number, default: 0 },//57 B
            total_tax: { type: Number, default: 0 },//58 B
            net_tax_payable: { type: Number, default: 0 },//59 B
        }
    },


    //Part VI schedule
    sched1: [{
        filer_type: {
            type: Boolean
            /**
             * taxpayer
             * spouse
             */
        },
        name_of_employer: String,
        employer_tin: String,
        compensation_income_grad: { type: Number, default: 0 },
        compensation_income_flat: { type: Number, default: 0 },
        tax_withheld: { type: Number, default: 0 },
        // gros_comp_tot_tax_withld_taxpayer: { type: Number, default: 0 },
        // gros_comp_tot_tax_withld_spouse: { type: Number, default: 0 },
        taxpayer:{
            regular_grad_total:{ type: Number, default: 0 }, //5A a
            flat_total: { type: Number, default: 0 }, //5A b
            tax_withheld_total: { type: Number, default: 0 }, //5A c
        },
        spouse_taxpayer:{
            regular_grad_total:{ type: Number, default: 0 }, //5B a
            flat_total: { type: Number, default: 0 },   //5B b
            tax_withheld_total: { type: Number, default: 0 }, //5B c
        }
    }],
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
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1700_forms', Form1700Schema);