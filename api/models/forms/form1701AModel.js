
"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {

    //For the Year //item 1
    //Amended Return //item 2
    //Short Period //item 3
    //Tin //item 4
    //RDO //item 5
    //Taxpayer Type //item 6

    taxpayer_atc_code: {
        type: String
        /*
        * item 7
        * 0 - II012
        * 1 - II015
        * 2 - II014
        * 3 - II017
        */
    },
    //Name //item 8
    //Address //item 9
    //Birthday //item 10
    //Email Address //item 11

    citizenship: { type: String }, //item 12
    claiming_foreign_tax_credits: {
        type: Boolean //item 13
    },
    taxpayer_foreign_tax_number: {
        type: String //14
    },
    //Contact Number //item 15
    //Civil Status //item 16

    spouse_income: {
        type: Boolean //item 17 if married,spouse has income 
    },

    filing_status: {
        type: String
        /*
        * item 18
        * 0 - Joint Filing
        * 1 - Separated Filing
        */
    },

    tax_rate: {
        type: String
        /*
        * 0 - graduated rates
        * 1 - 8% in liue of graduated rates
        * */
    },

    //PART II Total Tax Payable
    total_tax_payable: [{
        taxpayer: {
            prev_tax_due: { type: Number, default: 0 }, //Item 20 A
            total_tax_credit: { type: Number, default: 0 }, //Item 21 A
            net_tax_payable: { type: Number, default: 0 }, //Item 22  A
            portion_of_tax_payabe: { type: Number, default: 0 }, //Item 23 A
            amount_tax_payable: { type: Number, default: 0 }, //Item 24A
            surcharge: { type: Number, default: 0 }, //Item 25A
            interest: { type: Number, default: 0 }, //Item 26A 
            compromise: { type: Number, default: 0 }, //Item 27A
            total_penalties: { type: Number, default: 0 }, //Item 28A
            total_amount_payable: { type: Number, default: 0 }, //Item 29 A
        },
        taxpayer_spouse: {
            prev_tax_due: { type: Number, default: 0 }, //Item 20 B
            total_tax_credit: { type: Number, default: 0 }, //Item 21 B
            net_tax_payable: { type: Number, default: 0 }, //Item 22 B
            portion_of_tax_payabe: { type: Number, default: 0 }, //Item 23 B 
            amount_tax_payable: { type: Number, default: 0 }, //Item 24B
            surcharge: { type: Number, default: 0 }, //Item 25B
            interest: { type: Number, default: 0 }, //Item 26B
            compromise: { type: Number, default: 0 }, //Item 27B
            total_penalties: { type: Number, default: 0 }, //Item 28A
            total_amount_payable: { type: Number, default: 0 }, //Item 29 B
        },
        aggregate_amount_payable: { type: Number, default: 0 }, //Item 30
        if_overpayment: {
            /**
             * 0 - to be refunded
             * 1 - to be issued a tax credit certificate
             * 2 - to be carried over as a tax credit for next year
             */
        }
    }],
    //PART IV Computation of Income Tax

    //PART IV-A For Graduated Income Tax Rates
    grad_inc_tax_rates: [{
        desc1: { type: String },//Item 41
        desc2: { type: String },//Item 42
        taxpayer: {
            sales_rev_rec_fee: { type: Number, default: 0 }, //Item 36A
            less_sales_ret_allo_disc: { type: Number, default: 0 }, //Item 37A
            net_sales_rev_rec_fee: { type: Number, default: 0 }, //Item 38A
            less_allowable_deduction: { type: Number, default: 0 }, //Item 39A
            net_income: { type: Number, default: 0 }, //Item 40A
            other_operating_incom1: { type: Number, default: 0 }, //Item 41A
            other_operating_incom2: { type: Number, default: 0 }, //Item 42A
            amt_rec_gpp: { type: Number, default: 0 },//Item 43A
            tot_other_income: { type: Number, default: 0 }, //Item 44A
            tot_taxable_income: { type: Number, default: 0 }, //Item 45A
            tax_due: { type: Number, default: 0 }//Item 46A
        },
        taxpayer_spouse: {
            sales_rev_rec_fee: { type: Number, default: 0 }, //Item 36B
            less_sales_ret_allo_disc: { type: Number, default: 0 }, //Item 37B
            net_sales_rev_rec_fee: { type: Number, default: 0 }, //Item 38B
            less_allowable_deduction: { type: Number, default: 0 }, //Item 39B
            net_income: { type: Number, default: 0 }, //Item 40B
            other_operating_incom1: { type: Number, default: 0 }, //Item 41B
            other_operating_incom2: { type: Number, default: 0 }, //Item 42B
            amt_rec_gpp: { type: Number, default: 0 },//Item 43B
            tot_other_income: { type: Number, default: 0 }, //Item 44B
            tot_taxable_income: { type: Number, default: 0 }, //Item 45B
            tax_due: { type: Number, default: 0 }//Item 46B
        }
    }],

    //PART IV-B For 8% Income Tax Rate
    inc_tax_rate: [{
        desc1: { type: String },//Item 50
        desc2: { type: String },//Item 51
        taxpayer: {
            sales_rev_rec_fee: { type: Number, default: 0 }, //Item 47A
            less_sales_ret_allo_disc: { type: Number, default: 0 }, //Item 48A
            net_sales_rev_rec_fee: { type: Number, default: 0 }, //Item 49A
            other_non_operating_incom1: { type: Number, default: 0 }, //Item 50A
            other_non_operating_incom2: { type: Number, default: 0 }, //Item 51A
            tot_non_operating_income: { type: Number, default: 0 }, //Item 52A
            tot_tax_income: { type: Number, default: 0 }, //Item 53A
            tax_due: { type: Number, default: 0 }, //Item 54A
        },
        taxpayer_spouse: {
            sales_rev_rec_fee: { type: Number, default: 0 }, //Item 47B
            less_sales_ret_allo_disc: { type: Number, default: 0 }, //Item 48B
            net_sales_rev_rec_fee: { type: Number, default: 0 }, //Item 49B
            other_non_operating_incom1: { type: Number, default: 0 }, //Item 50B
            other_non_operating_incom2: { type: Number, default: 0 }, //Item 51B
            tot_non_operating_income: { type: Number, default: 0 }, //Item 52B
            tot_tax_income: { type: Number, default: 0 }, //Item 53B
            tax_due: { type: Number, default: 0 }, //Item 54B
        }
    }],

    //PART IV-C Tax Credits/Payments
    desc: { type: String }, //Item 63
    tapayer: {
        prior_years_excess_cred: { type: Number, default: 0 }, //Item 57A
        tax_payment_three_quarters: { type: Number, default: 0 }, //Item 58A
        cred_tax_withheld_three_quarters: { type: Number, default: 0 }, //Item 59A
        cred_tax_withheld_per_bir_f2307: { type: Number, default: 0 }, //Item 60A
        tax_paid_prev_filed: { type: Number, default: 0 }, //Item 61A
        foreign_tax_credit: { type: Number, default: 0 }, //Item 62A
        other_tax_credit: { type: Number, default: 0 }, //Item 63A
        tot_tax_credit_payment: { type: Number, default: 0 }, //Item 64A
        net_tax_payable: { type: Number, default: 0 } //Item 65A
    },
    taxpayer_spouse: {
        prior_years_excess_cred: { type: Number, default: 0 }, //Item 57B
        tax_payment_three_quarters: { type: Number, default: 0 }, //Item 58B
        cred_tax_withheld_three_quarters: { type: Number, default: 0 }, //Item 59B
        cred_tax_withheld_per_bir_f2307: { type: Number, default: 0 }, //Item 60B
        tax_paid_prev_filed: { type: Number, default: 0 }, //Item 61B
        foreign_tax_credit: { type: Number, default: 0 }, //Item 62B
        other_tax_credit: { type: Number, default: 0 }, //Item 63B
        tot_tax_credit_payment: { type: Number, default: 0 }, //Item 64B
        net_tax_payable: { type: Number, default: 0 } //Item 65B
    },
    taxpayer_spouse: [{

        atc_code: {
            type: String
            /*
            * item 69
            * 0 - II012
            * 1 - II015
            * 2 - II014
            * 3 - II017
            */
        },
        citizenship: String, //72
        claim_tax_credit: Boolean, //73
        foreign_tax_no: Number, // 74
        tax_rate: String // 75

    }]

};

var Form1701ASchema = new Schema({
    ...common_model,
    ...model_schema
});

Form1701ASchema.pre('save', function (callback) {
    this.date_created = new Date();
    this.date_modified = new Date();
    callback();
});

Form1701ASchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1701ASchema, '1701a_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});

module.exports = mongoose.model("1701a_forms", Form1701ASchema);