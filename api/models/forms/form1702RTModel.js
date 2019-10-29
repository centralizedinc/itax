/**
 * 
 * @description FORM 1702RT (JANUARY 2018)
 * @author Venus
 * @base_form https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1702-RT%20Jan%202018%20ENCS%20Final%20v3.pdf
 * @version 1.0 - 10/23/2019
 * 
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    // year_type: { // already on taxpayer model as 'accounting_type'
    //     type: Date
    // },
    // year_ended_month: { // already on taxpayer model as 'start_month'
    //     type: Date
    // },
    // year_ended_year: { // already on common model as 'return_period_year'
    //     type: Date
    // },
    // short_period_return: { // already on common model as 'short_period'
    //     type: Boolean
    // },
    atc_code: {
        type: String
            // IC055,
            // IC010,
            // IC020,
            // IC040,
            // IC041,
            // IC070
    },
    date_incorporation: {
        type: Date
    }, //item10
    method_deduction: {
        type: String
            // itemized_deduction,
            // optional_standard_deduction
    },

    //Part 2 Total tax payable
    prev_tax_due: { // item 14
        type: Number,
        default: 0
    }, //(From Part IV Item 43)
    total_tax_credits: { // item 15
        type: Number,
        default: 0
    },
    net_tax_payable: { // item 16 - item 14 less item 15 From Part IV item 55
        type: String
    },
    refund_type: {
        type: String
    }, //item22 if overpayment

    // Part II - Details of Payment
    particular_cash: [{ // item 24
        drawee_bank: {
            type: Number,
            default: 0
        },
        number: {
            type: Number,
            default: 0
        },
        date: {
            type: Date
        },
        amount: {
            type: Number,
            default: 0
        }
    }],
    particular_check: [{ // item 25
        drawee_bank: {
            type: Number,
            default: 0
        },
        number: {
            type: Number,
            default: 0
        },
        date: {
            type: Date
        },
        amount: {
            type: Number,
            default: 0
        }
    }],
    particular_tax_debit: [{ // item 26
        drawee_bank: {
            type: Number,
            default: 0
        },
        number: {
            type: Number,
            default: 0
        },
        date: {
            type: Date
        },
        amount: {
            type: Number,
            default: 0
        }
    }],
    particular_others: [{ // item 27
        drawee_bank: {
            type: Number,
            default: 0
        },
        number: {
            type: Number,
            default: 0
        },
        date: {
            type: Date
        },
        amount: {
            type: Number,
            default: 0
        }
    }],

    // Part IV - Computation of Tax
    sales_fees: { // item 27
        type: Number
    },
    less_sales_returns: { // item 28
        type: Number
    },
    net_sales_fees: { // item 29
        type: Number
    },
    less_cost_sales: { // item 30
        type: Number
    },
    gross_income: { // item 31
        type: Number
    },
    add_other_income: { // item 32
        type: Number
    },
    total_taxable: { // item 33 
        type: Number
    },
    ordinary_deductions: { // item 34 From Part VI  Schedule I Item 18
        type: Number
    },
    special_deductions: { // item 35 From Part VI  Schedule II Item 5
        type: Number
    },
    nolco: { // item 36 From Part VI  Schedule III Item 8
        type: Number
    },
    total_deductions: { // item 37
        type: Number
    },
    optional_standard_deductions: { // item 38 40% of Item 33
        type: Number
    },
    net_income: { // item 39
        type: Number
    },
    applicable_income_tax_rate: { // item 40
        type: Number
    },
    income_tax_due: { // item 41
        type: Number
    },
    mcit_due: { // item 42 2% of Item33
        type: Number
    },
    part4_tax_due: { // item 43
        type: Number
    },
    prior_excess_credits: { // item 44
        type: Number
    },
    income_tax_payment_mcit: { // item 45
        type: Number
    },
    income_tax_payment_rate: { // item 46
        type: Number
    },
    excess_mcit_applied: { // item 47
        type: Number
    },
    creditable_tax_withheld_previous: { // item 48
        type: Number
    },
    creditable_tax_withheld: { // item 49
        type: Number
    },
    foreign_credits: { // item 50
        type: Number
    },
    tax_paid: { // item 51
        type: Number
    },
    special_tax_credits: { // item 52 to  Part V Item 58
        type: Number
    },
    less_others: [{ //Item 53-54
        description: {
            type: String
        },
        amount: {
            type: Number
        }
    }],
    part4_tax_credits: { // item 55
        type: Number
    },
    part4_total_amount: { // item 56
        type: Number
    },


    // Part V
    reg_income_tax: { // item 57
        type: Number
    },
    part5_special_deduction: { // item 58
        type: Number
    },
    total_tax_relief: { // item 59
        type: Number
    },

    // Part VI - Schedule I
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
    // Part VI - Schedule II
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
    // Part VI - Schedule III
    sched3: {
        net_gross_income: { // From Part IV item 33
            type: Number
        },
        less_deductions: { // From Part VI Schedule I item 18
            type: Number
        },
        net_taxable_income: { // Item 1 less item 2 - To Schedule 3A, Item 7A
            type: Number
        }
    },
    // Part VI - Schedule IIIA
    sched3A: {
        year_incurred: {
            type: Date
        },
        amount: {
            type: Number
        },
        nolco_applied_previous: {
            type: Number
        },
        nolco_expired: {
            type: Number
        },
        nolco_current_year: {
            type: Number
        },
        net_operating_loss: {
            type: Number
        },
        total_nolco: { // Sum of items 4D to 7D - Part IV item 36
            type: Number
        }
    },
    // Part VI - Schedule IV
    sched4: {
        year: {
            type: Date
        },
        normal_income_tax: {
            type: Number
        },
        mcit: {
            type: Number
        },
        excess_mcit: {
            type: Number
        },
        previous_excess_mcit: {
            type: Number
        },
        expired_portion: {
            type: Number
        },
        current_excess_mcit: {
            type: Number
        },
        balance_excess_mcit: {
            type: Number
        },
        total_excess_mcit: { // Sum of items 1F to 3F - Part IV item 47
            type: Number
        }
    },
    //Part VI Schedule V
    sched5: {
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
        total_expense: { // Sum of Items 1 to 3
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
        total_deductions: { // Sum of items 5 to 8
            type: Number
        },
        net_taxable_income: { // Item 4 less item 9
            type: Number
        }
    }
};

var Form1702RTSchema = new Schema({
    ...common_model,
    ...model_schema
});

Form1702RTSchema.pre('save', function(callback) {
    this.date_created = new Date();
    this.date_modified = new Date();
    callback();
});

Form1702RTSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1702RTSchema, '1702rt_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});

module.exports = mongoose.model("1702rt_forms", Form1702RTSchema);