/**
 * 
 * @description FORM 1702EX (JANUARY 2018)
 * @author Mark
 * @base_form https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1702-EX%20Jan%202018%20ENCS%20Final%20v3.pdf
 * @version 1.0 - 10/21/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    atc_code: { // item 5
        type: String
    },


    // Part I
    date_incorporation: { // item 10
        type: Date,
        default: new Date()
    },
    method_deduction: { // item 13
        type: String,
        default: "ID" // with fixed value -> itemized deduction
    },
    legal_basis: { // item 14
        type: String
    },
    agency: { // item 15
        type: String
    },
    registered_no: { // item 16
        type: String
    },
    effective_date_from: { // item 17
        type: Date
    },
    effective_date_to: { // item 17
        type: Date
    },


    // Part II
    prev_tax_due: { // item 18
        type: Number
    },
    tax_credits: { // item 19
        type: String
    },
    ctc_no: { // item 23
        type: String
    },
    date_issue: { // item 24
        type: Date
    },
    place_issue: { // item 25
        type: String
    },
    ctc_amount: { // item 26
        type: Number
    },


    // Part IV
    sales_fees: { // item 28
        type: Number
    },
    less_sales_returns: { // item 29
        type: Number
    },
    net_sales_fees: { // item 30
        type: Number
    },
    less_cost_sales: { // item 31
        type: Number
    },
    gross_income: { // item 32
        type: Number
    },
    add_other_income: { // item 33
        type: Number
    },
    total_gross_income: { // item 34
        type: Number
    },
    less_ordinary_deductions: { // item 35
        type: Number
    },
    less_special_deductions: { // item 36
        type: Number
    },
    less_total_deductions: { // item 37
        type: Number
    },
    net_income: { // item 38
        type: Number
    },
    part4_tax_rate: { // item 39
        type: Number
    },
    part4_tax_due: { // item 40
        type: Number
    },
    less_excess_credits: { // item 41
        type: Number
    },
    less_income_tax: { // item 42
        type: Number
    },
    less_creditable_previous: { // item 43
        type: Number
    },
    less_creditable_fourth: { // item 44
        type: Number
    },
    less_foreign_credits: { // item 45
        type: Number
    },
    less_tax_paid: { // item 46
        type: Number
    },
    less_others: [{
        description: {
            type: String
        },
        amount: {
            type: Number
        }
    }],
    part4_tax_credits: { // item 49
        type: Number
    },
    part4_total_amount: { // item 50
        type: Number
    },


    // Part V
    reg_income_tax: { // item 51
        type: Number
    },
    part5_special_deduction: { // item 52
        type: Number
    },
    total_tax_relief: { // item 53
        type: Number
    },

    // Part VI - Schedules
    sched1: {
        amortizations: { // sched1 - item 1
            type: Number
        },
        bad_debts: { // sched1 - item 2
            type: Number
        },
        charitable_contributions: { // sched1 - item 3
            type: Number
        },
        depletion: { // sched1 - item 4
            type: Number
        },
        depreciation: { // sched1 - item 5
            type: Number
        },
        entertainment: { // sched1 - item 6
            type: Number
        },
        fringe_benefits: { // sched1 - item 7
            type: Number
        },
        interest: { // sched1 - item 8
            type: Number
        },
        losses: { // sched1 - item 9
            type: Number
        },
        pension_trusts: { // sched1 - item 10
            type: Number
        },
        rental: { // sched1 - item 11
            type: Number
        },
        research_development: { // sched1 - item 12
            type: Number
        },
        salaries_allowances: { // sched1 - item 13
            type: Number
        },
        sss_contributions: { // sched1 - item 14
            type: Number
        },
        taxes_licenses: { // sched1 - item 15
            type: Number
        },
        transportation_travel: { // sched1 - item 16
            type: Number
        },
        janitorial_services: { // sched1 - item 17a
            type: Number
        },
        professional_fees: { // sched1 - item 17b
            type: Number
        },
        security_services: { // sched1 - item 17c
            type: Number
        },
        others: [{
            description: {
                type: String
            },
            amount: {
                type: Number
            }
        }],
        part5_total_deductions: { // sched1 - item 18
            type: Number
        }
    },
    sched2: [{
        description: {
            type: String
        },
        legal_basis: {
            type: String
        },
        amount: {
            type: Number
        } 
    }],
    sched3: {
        net_per_books: { // sched2 item 1
            type: Number
        },
        non_deductible_incomes: [{ // sched2 item 2
            description: {
                type: String
            },
            amount: {
                type: Number
            }
        }],
        total_expense: { // sched2 item 4
            type: Number
        },
        non_taxable_incomes: [{ // sched2 item 5
            description: {
                type: String
            },
            amount: {
                type: Number
            }
        }],
        special_deductions: [{ // sched2 item 7
            description: {
                type: String
            },
            amount: {
                type: Number
            }
        }],
        total_deductions: { // sched2 item 9
            type: Number
        },
        net_taxable_income: { // sched2 item 10
            type: Number
        }
    }
};

var Form1702EXSchema = new Schema({...common_model, ...model_schema });

Form1702EXSchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1702EXSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1702EXSchema, '1702ex_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
        // Plugin failed to initialise
        console.log("############### init failed: " + e);
    });


module.exports = mongoose.model('1702ex_forms', Form1702EXSchema);