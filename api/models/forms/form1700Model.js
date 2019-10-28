/**
 * 
 * @description FORM 1700 (JANUARY 2018)
 * @author Mark
 * @base_form https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1700%20Jan%202018%20ENCS%20v6.pdf
 * @version 1.0 - 10/28/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
var common_model = require('./commonModels');

const model_schema = {
    atc_code: { // item 3
        type: String
    },

    // Part I
    taxpayer_filer_type: { // item 6
        type: String
    },
    claiming_foreign_tax_credit: { // item 12
        type: Boolean
    },
    foreign_tax_number: { // item 13
        type: String
    },
    spouse_has_income: { // item 16
        type: Boolean
    },
    filing_status: { // item 17
        type: String
    },


    // Part II
    spouse_filer_type: { // item 20
        type: String
    },
    spouse_claiming_foreign_tax: { // item 24
        type: String
    },
    spouse_foreign_tax_number: { // item 25
        type: String
    },


    // Part III
    taxpayer_tax_payable: {
        prev_tax_due: { // item 26A
            type: Number
        },
        tax_credits: { // item 27A
            type: Number
        },
        net_tax_payable: { // item 28A
            type: Number
        },
        portion_of_tax_payable: { // item 29A
            type: Number
        },
        tax_due: { // item 30A
            type: Number
        },
        surcharge: { // item 31A
            type: Number
        },
        interest: { // item 32A
            type: Number
        },
        compromise: { // item 33A
            type: Number
        },
        penalties: { // item 34A
            type: Number
        },
        total_amount_payable: { // item 35A
            type: Number
        }
    },
    spouse_tax_payable: {
        prev_tax_due: { // item 26B
            type: Number
        },
        tax_credits: { // item 27B
            type: Number
        },
        net_tax_payable: { // item 28B
            type: Number
        },
        portion_of_tax_payable: { // item 29B
            type: Number
        },
        tax_due: { // item 30B
            type: Number
        },
        surcharge: { // item 31B
            type: Number
        },
        interest: { // item 32B
            type: Number
        },
        compromise: { // item 33B
            type: Number
        },
        penalties: { // item 34B
            type: Number
        },
        total_amount_payable: { // item 35B
            type: Number
        }
    },
    // Item 36 - Aggregate Ammount Payable is total_amount_payable of commonModel


    // Part V - A (Subject to Graduated Rates)
    part5a: {
        taxpayer_rates: {
            gross_compensation_income: { // item 42A
                type: Number
            },
            non_taxable: { // item 43A
                type: Number
            },
            gross_taxable: { // item 44A
                type: Number
            },
            // Item 45A is merge in other_taxables with spouse
            total_taxable_income: { // item 46A
                type: Number
            },
            tax_due: { // item 47A
                type: Number
            }
        },
        spouse_rates: {
            gross_compensation_income: { // item 42B
                type: Number
            },
            non_taxable: { // item 43B
                type: Number
            },
            gross_taxable: { // item 44B
                type: Number
            },
            // Item 45B is merge in other_taxables with taxpayer
            total_taxable_income: { // item 46B
                type: Number
            },
            tax_due: { // item 47B
                type: Number
            }
        },
        other_taxables: [{
            description: { // item 45
                type: String
            },
            taxpayer_amount: { // item 45A
                type: Number
            },
            spouse_amount: { // item 45B
                type: Number
            }
        }]
    },


    // Part V - B (Subject to 25% Flat Rate for NRANETB)
    part5b: {
        taxpayer_rates: {
            gross_compensation_income: { // item 48A
                type: Number
            },
            gross_taxable: { // item 50A
                type: Number
            },
            // Item 51A is merge in other_taxables with spouse
            total_taxable_income: { // item 52A
                type: Number
            },
            tax_due: { // item 53A
                type: Number
            }
        },
        spouse_rates: {
            gross_compensation_income: { // item 48B
                type: Number
            },
            gross_taxable: { // item 50B
                type: Number
            },
            // Item 51B is merge in other_taxables with taxpayer
            total_taxable_income: { // item 52B
                type: Number
            },
            tax_due: { // item 53B
                type: Number
            }
        },
        non_taxables: [{
            description: { // item 49
                type: String
            },
            taxpayer_amount: { // item 49A
                type: Number
            },
            spouse_amount: { // item 49B
                type: Number
            }
        }],
        other_taxables: [{
            description: { // item 51
                type: String
            },
            taxpayer_amount: { // item 51A
                type: Number
            },
            spouse_amount: { // item 51B
                type: Number
            }
        }]
    },


    // Part V - C (Tax Credits/Payments)
    part5c: {
        taxpayer_rates: {
            tax_wittheld: { // item 54A
                type: Number
            },
            tax_paid: { // item 55A
                type: Number
            },
            foreign_tax_credit: { // item 56A
                type: Number
            },
            // Item 57A is merge in other_taxables with spouse
            total_tax_credit: { // item 58A
                type: Number
            },
            net_tax_payable: { // item 59A
                type: Number
            }
        },
        spouse_rates: {
            tax_wittheld: { // item 54B
                type: Number
            },
            tax_paid: { // item 55B
                type: Number
            },
            foreign_tax_credit: { // item 56B
                type: Number
            },
            // Item 57A is merge in other_taxables with taxpayer
            total_tax_credit: { // item 58B
                type: Number
            },
            net_tax_payable: { // item 59B
                type: Number
            }
        },
        other_tax_credits: [{
            description: { // item 56
                type: String
            },
            taxpayer_amount: { // item 56A
                type: Number
            },
            spouse_amount: { // item 56B
                type: Number
            }
        }]
    },


    // Schedule 1 - Gross Compensation Income and Tax Withheld
    sched1: [{
        filer_type: {
            type: String
            /**
             * taxpayer
             * spouse
             */
        },
        name_of_employer: { // item A
            type: String
        },
        employer_tin: { // item B
            type: String
        },
        compensation_income_grad: { // item C
            type: Number
        },
        compensation_income_flat: { // item D
            type: Number
        },
        tax_withheld: { // item E
            type: Number
        }
    }],

    sched1_totals: {
        taxpayer_rates: {
            compensation_graduated_total: {
                type: Number
            },
            compensation_flat_total: {
                type: Number
            },
            total_tax_withheld: {
                type: Number
            }
        },
        spouse_rates: {
            compensation_graduated_total: {
                type: Number
            },
            compensation_flat_total: {
                type: Number
            },
            total_tax_withheld: {
                type: Number
            }
        }
    }
};

var Form1700Schema = new Schema({ ...common_model, ...model_schema });

Form1700Schema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1700Schema.pre('findOneAndUpdate', function (callback) {
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