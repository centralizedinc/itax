/**
 * 
 * @description FORM 1702MX (JANUARY 2018)
 * @author Venus
 * @base_form https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1702-MX%20Jan%202018%20ENCS%20Final%20with%20OSDv2.pdf
 * @version 1.0 - 11/05/2019
 * 
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    atc_code: {
        type: String
            // IC055
    },
    date_incorporation: {
        type: Date
    }, //item10
    method_deduction: {
        type: String
            // ID,
            // OSD
    },
    //Part 2 Total tax payable
    prev_tax_due: { // item 14
        type: Number,
        default: 0
    }, //(From Part IV Scehdule 2 Item 19D)
    less_total_tax_credits: {
        type: Number,
        default: 0
    }, //(From Part IV Scehdule 3 Item 32D)
    net_tax_payable: {
        type: Number
    }, //(Item 14 Less Item 15) (From Part IV Item 33D)
    total_amount_payable: {
        type: Number
    }, // (Sum of Items 16 and 20) 
    refund_type: {
        type: String
    }, //item21 if overpayment

    // Part III - Details of Payment

    // Schedule 1 - Basis of Tax Relief
    sched1: [{
        exempt: [{
            investment_promotion: {
                type: Number
            },
            legal_basis: {
                type: Number
            },
            registered_activity: {
                type: Number
            },
            effectivity_tax_relief: {
                type: Date,
                default: new Date()
            },
            expiration_tax_relief: {
                type: Date,
                default: new Date()
            }
        }],
        special: [{
            investment_promotion: {
                type: Number
            },
            legal_basis: {
                type: Number
            },
            registered_activity: {
                type: Number
            },
            special_tax_rate: {
                type: Number
            },
            effectivity_tax_relief: {
                type: Date,
                default: new Date()
            },
            expiration_tax_relief: {
                type: Date,
                default: new Date()
            }
        }],
        special_tax_relief: [{
            investment_promotion: {
                type: Number
            },
            legal_basis: {
                type: Number
            },
            registered_activity: {
                type: Number
            },
            effectivity_tax_relief: {
                type: Date,
                default: new Date()
            },
            expiration_tax_relief: {
                type: Date,
                default: new Date()
            }
        }]
    }],
    // Schedule 2 - Computation of Income Tax per Tax Regime
    sched2: [{
        total_exempt: [{
            sales_fees: {
                type: Number
            }, // (From all of Part V-Sched B Item 1, if letter B of instructions above is marked)
            less_sales_returns: {
                type: Number
            }, //  (From all of Part V-Sched B Item 2, if letter B of instructions above is marked)
            net_sales_fees: {
                type: Number
            }, //  (Item 1 Less Item 2) 
            less_cost_sales: {
                type: Number
            }, // (From all of Part V-Sched B Item 4, if letter B of instructions above is marked)
            gross_income: {
                type: Number
            }, //  (Item 3 Less Item 4) 
            add_other_income: {
                type: Number
            }, // (From all of Part V-Sched B Item 6, if letter B of instructions above is marked)
            total_taxable: {
                type: Number
            }, //  (Sum of Items 5 and 6) 
            ordinary_deductions: {
                type: Number
            }, // (From all of Part V-Sched B Item 8, if letter B of instructions above is marked)
            special_deductions: {
                type: Number
            }, // (From all of Part V-Sched B Item 9, if letter B of instructions above is marked)
            total_deductions: {
                type: Number
            }, //  (Sum of Items 8 to 10) 
            optional_standard_deductions: {
                type: Number
            },
            income_tax_due: {
                type: Number
            }
        }],
        total_special: [{
            sales_fees: {
                type: Number
            }, // (From all of Part V-Sched B Item 1, if letter B of instructions above is marked)
            less_sales_returns: {
                type: Number
            }, //  (From all of Part V-Sched B Item 2, if letter B of instructions above is marked)
            net_sales_fees: {
                type: Number
            }, //  (Item 1 Less Item 2) 
            less_cost_sales: {
                type: Number
            }, // (From all of Part V-Sched B Item 4, if letter B of instructions above is marked)
            gross_income: {
                type: Number
            }, //  (Item 3 Less Item 4) 
            add_other_income: {
                type: Number
            }, // (From all of Part V-Sched B Item 6, if letter B of instructions above is marked)
            total_taxable: {
                type: Number
            }, //  (Sum of Items 5 and 6) 
            ordinary_deductions: {
                type: Number
            }, // (From all of Part V-Sched B Item 8, if letter B of instructions above is marked)
            special_deductions: {
                type: Number
            }, // (From all of Part V-Sched B Item 9, if letter B of instructions above is marked)
            nolco: {
                type: Number
            },
            total_deductions: {
                type: Number
            }, //  (Sum of Items 8 to 10) 
            optional_standard_deductions: {
                type: Number
            },
            income_tax_due: {
                type: Number
            },
            applicable_income_tax_rate: {
                type: Number
            },
            less_share_remitted: {
                type: Number
            },
            net_income: {
                type: Number
            }, // (Item 15 Less Item 16) 
            sched1_total_tax_due: {
                type: Number
            }
        }],
        total_regular: [{
            sales_fees: {
                type: Number
            }, // (From all of Part V-Sched B Item 1, if letter B of instructions above is marked)
            less_sales_returns: {
                type: Number
            }, //  (From all of Part V-Sched B Item 2, if letter B of instructions above is marked)
            net_sales_fees: {
                type: Number
            }, //  (Item 1 Less Item 2) 
            less_cost_sales: {
                type: Number
            }, // (From all of Part V-Sched B Item 4, if letter B of instructions above is marked)
            gross_income: {
                type: Number
            }, //  (Item 3 Less Item 4) 
            add_other_income: {
                type: Number
            }, // (From all of Part V-Sched B Item 6, if letter B of instructions above is marked)
            total_taxable: {
                type: Number
            }, //  (Sum of Items 5 and 6) 
            ordinary_deductions: {
                type: Number
            }, // (From all of Part V-Sched B Item 8, if letter B of instructions above is marked)
            special_deductions: {
                type: Number
            }, // (From all of Part V-Sched B Item 9, if letter B of instructions above is marked)
            nolco: {
                type: Number
            },
            total_deductions: {
                type: Number
            }, //  (Sum of Items 8 to 10) 
            optional_standard_deductions: {
                type: Number
            },
            income_tax_due: {
                type: Number
            },
            applicable_income_tax_rate: {
                type: Number
            },
            less_share_remitted: {
                type: Number
            },
            net_income: {
                type: Number
            }, // (Item 15 Less Item 16) 
            sched1_total_tax_due: {
                type: Number
            }
        }],
        total_all_columns: [{
            sales_fees: {
                type: Number
            }, // (From all of Part V-Sched B Item 1, if letter B of instructions above is marked)
            less_sales_returns: {
                type: Number
            }, //  (From all of Part V-Sched B Item 2, if letter B of instructions above is marked)
            net_sales_fees: {
                type: Number
            }, //  (Item 1 Less Item 2) 
            less_cost_sales: {
                type: Number
            }, // (From all of Part V-Sched B Item 4, if letter B of instructions above is marked)
            gross_income: {
                type: Number
            }, //  (Item 3 Less Item 4) 
            add_other_income: {
                type: Number
            }, // (From all of Part V-Sched B Item 6, if letter B of instructions above is marked)
            total_taxable: {
                type: Number
            }, //  (Sum of Items 5 and 6) 
            ordinary_deductions: {
                type: Number
            }, // (From all of Part V-Sched B Item 8, if letter B of instructions above is marked)
            special_deductions: {
                type: Number
            }, // (From all of Part V-Sched B Item 9, if letter B of instructions above is marked)
            nolco: {
                type: Number
            },
            total_deductions: {
                type: Number
            }, //  (Sum of Items 8 to 10) 
            optional_standard_deductions: {
                type: Number
            },
            income_tax_due: {
                type: Number
            },
            less_share_remitted: {
                type: Number
            },
            net_income: {
                type: Number
            }, // (Item 15 Less Item 16) 
            sched1_total_tax_due: {
                type: Number
            }
        }]
    }],
    // Schedule 3 - 
    sched3: [{
        prior_excess_credits: {
            type: Number
        },
        income_tax_payment_mcit: {
            type: Number
        },
        income_tax_payment_rate: {
            type: Number
        },
        excess_mcit_applied: {
            type: Number
        }, // (From Schedule 9 Item 4)
        creditable_tax_withheld_previous: {
            type: Number
        },
        creditable_tax_withheld: {
            type: Number
        },
        foreign_credits: {
            type: Number
        },
        tax_paid: {
            type: Number
        },
        special_tax_credits: {
            type: Number
        }, // (To Part IV-Schedule 4 Item 6)
        less_others: [{
            description: {
                type: String
            },
            amount: {
                type: Number
            }
        }],
        total_tax_credits: {
            type: Number
        }, // (Sum of Items 20 to 31) (Item 32D to Part II Item 15)
        net_tax_payable: {
            type: Number
        } // (Item 19 Less Item 32) (Item 33D to Part II Item 16)
    }],
    // Schedule 5 - Ordinary Allowable Itemized Deductions
    sched5: [{
        total_exempt: [{
            amortizations: { // item 1
                type: Number
            },
            bad_debts: { // item 2
                type: Number
            },
            charitable_contributions: { // item 3
                type: Number
            },
            depletion: { // item 4
                type: Number
            },
            depreciation: { // item 5
                type: Number
            },
            entertainment: { // item 6
                type: Number
            },
            fringe_benefits: { // item 7
                type: Number
            },
            interest: { // item 8
                type: Number
            },
            losses: { // item 9
                type: Number
            },
            pension_trusts: { // item 10
                type: Number
            },
            rental: { // item 11
                type: Number
            },
            research_development: { // item 12
                type: Number
            },
            salaries_allowances: { // item 13
                type: Number
            },
            sss_contributions: { // item 14
                type: Number
            },
            taxes_licenses: { // item 15
                type: Number
            },
            transportation_travel: { // item 16
                type: Number
            },
            janitorial_services: { // item 17a
                type: Number
            },
            professional_fees: { // item 17b
                type: Number
            },
            security_services: { // item 17c
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
            total_deductions: { // item 18
                type: Number
            }
        }],
        total_special: [{
            amortizations: { // item 1
                type: Number
            },
            bad_debts: { // item 2
                type: Number
            },
            charitable_contributions: { // item 3
                type: Number
            },
            depletion: { // item 4
                type: Number
            },
            depreciation: { // item 5
                type: Number
            },
            entertainment: { // item 6
                type: Number
            },
            fringe_benefits: { // item 7
                type: Number
            },
            interest: { // item 8
                type: Number
            },
            losses: { // item 9
                type: Number
            },
            pension_trusts: { // item 10
                type: Number
            },
            rental: { // item 11
                type: Number
            },
            research_development: { // item 12
                type: Number
            },
            salaries_allowances: { // item 13
                type: Number
            },
            sss_contributions: { // item 14
                type: Number
            },
            taxes_licenses: { // item 15
                type: Number
            },
            transportation_travel: { // item 16
                type: Number
            },
            janitorial_services: { // item 17a
                type: Number
            },
            professional_fees: { // item 17b
                type: Number
            },
            security_services: { // item 17c
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
            total_deductions: { // item 18
                type: Number
            }
        }],
        total_regular: [{
            amortizations: { // item 1
                type: Number
            },
            bad_debts: { // item 2
                type: Number
            },
            charitable_contributions: { // item 3
                type: Number
            },
            depletion: { // item 4
                type: Number
            },
            depreciation: { // item 5
                type: Number
            },
            entertainment: { // item 6
                type: Number
            },
            fringe_benefits: { // item 7
                type: Number
            },
            interest: { // item 8
                type: Number
            },
            losses: { // item 9
                type: Number
            },
            pension_trusts: { // item 10
                type: Number
            },
            rental: { // item 11
                type: Number
            },
            research_development: { // item 12
                type: Number
            },
            salaries_allowances: { // item 13
                type: Number
            },
            sss_contributions: { // item 14
                type: Number
            },
            taxes_licenses: { // item 15
                type: Number
            },
            transportation_travel: { // item 16
                type: Number
            },
            janitorial_services: { // item 17a
                type: Number
            },
            professional_fees: { // item 17b
                type: Number
            },
            security_services: { // item 17c
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
            total_deductions: { // item 18
                type: Number
            }
        }],
        total_all_columns: [{
            amortizations: { // item 1
                type: Number
            },
            bad_debts: { // item 2
                type: Number
            },
            charitable_contributions: { // item 3
                type: Number
            },
            depletion: { // item 4
                type: Number
            },
            depreciation: { // item 5
                type: Number
            },
            entertainment: { // item 6
                type: Number
            },
            fringe_benefits: { // item 7
                type: Number
            },
            interest: { // item 8
                type: Number
            },
            losses: { // item 9
                type: Number
            },
            pension_trusts: { // item 10
                type: Number
            },
            rental: { // item 11
                type: Number
            },
            research_development: { // item 12
                type: Number
            },
            salaries_allowances: { // item 13
                type: Number
            },
            sss_contributions: { // item 14
                type: Number
            },
            taxes_licenses: { // item 15
                type: Number
            },
            transportation_travel: { // item 16
                type: Number
            },
            janitorial_services: { // item 17a
                type: Number
            },
            professional_fees: { // item 17b
                type: Number
            },
            security_services: { // item 17c
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
            total_deductions: { // item 18
                type: Number
            }
        }]
    }],
    // Schedule 6 - Special Allowable Itemized Deductions
    sched6: [{
        description: {
            type: String
        },
        legal_basis: {
            type: String
        },
        total_exempt: {
            type: Number
        },
        total_special: {
            type: Number
        },
        total_regular: {
            type: Number
        },
        total_all_columns: {
            type: Number
        },
        total_special_allowable: {
            type: Number
        } // (Sum of Items 1 to 4) (To Part IV-Schedule 2 Item 9)
    }],
    // Schedule 7 - Computation of Net Operating Loss Carry Over (NOLCO) for Regular Rate
    sched7: {
        net_gross_income: { //  (From Part IV-Schedule 2 Item 7C)
            type: Number
        },
        less_deductions: { //  (From Part IV-Schedule 2 Item 8C)
            type: Number
        },
        net_taxable_income: { // (Item 1 Less Item 2) (To Part IV-Schedule 7.1, Item 7A)
            type: Number
        }
    },
    // Schedule 7A - Computation of Available Net Operating Loss Carry Over (NOLCO) for Regular Rate 
    sched7A: {
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
        total_nolco: { // (Sum of Items 4D to 7D) (To Part IV-Schedule 2 Item 10C)
            type: Number
        }
    },
    // Schedule 9 - Computation of Minimum Corporate Income Tax (MCIT)
    sched9: {
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
    // Schedule 10 - Reconciliation of Net Income per Books Against Taxable Income
    sched10: [{
        total_exempt: [{
            net_per_books: {
                type: Number
            },
            non_deductible_incomes: [{
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
            non_taxable_incomes: [{ // sched10 item 5&6
                description: {
                    type: String
                },
                amount: {
                    type: Number
                }
            }],
            special_deductions: [{ // sched10 item 7&8
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
        }],
        total_special: [{
            net_per_books: {
                type: Number
            },
            non_deductible_incomes: [{
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
            non_taxable_incomes: [{ // sched10 item 5&6
                description: {
                    type: String
                },
                amount: {
                    type: Number
                }
            }],
            special_deductions: [{ // sched10 item 7&8
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
        }],
        total_regular: [{
            net_per_books: {
                type: Number
            },
            non_deductible_incomes: [{
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
            non_taxable_incomes: [{ // sched10 item 5&6
                description: {
                    type: String
                },
                amount: {
                    type: Number
                }
            }],
            special_deductions: [{ // sched10 item 7&8
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
        }],
        total_all_columns: [{
            net_per_books: {
                type: Number
            },
            non_deductible_incomes: [{
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
            non_taxable_incomes: [{ // sched10 item 5&6
                description: {
                    type: String
                },
                amount: {
                    type: Number
                }
            }],
            special_deductions: [{ // sched10 item 7&8
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
        }]

    }]
};

var Form1702MXSchema = new Schema({
    ...common_model,
    ...model_schema
});

Form1702MXSchema.pre('save', function(callback) {
    this.date_created = new Date();
    this.date_modified = new Date();
    callback();
});

Form1702MXSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1702MXSchema, '1702mx_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});

module.exports = mongoose.model("1702mx_forms", Form1702MXSchema);