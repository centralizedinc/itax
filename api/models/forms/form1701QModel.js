"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    quarter: {
        type: Number,
        default: 0
            // first,
            // second,
            // third
    },
    taxpayer_filer_type: {
        type: String
            // single_proprietor,
            // professional,
            // estate,
            // trust
    },
    taxpayer_atc_code: [{
        type: String
            // II012,
            // II015,
            // II014,
            // II017,
            // II013,
            // II016
    }],
    taxpayer_foreign_tax_credits: {
        type: Boolean,
        default: false
    },
    taxpayer_tax_rate: {
        type: String
            // graduated_rates ,
            //  non_operating_income
    },
    taxpayer_method_deduction: {
        type: String
            // itemized_deduction,
            // optional_standard_deduction
    },
    spouse_method_deduction: {
        type: String
            // itemized_deduction,
            // optional_standard_deduction
    },
    spouse_filer_type: {
        type: String
            // single_proprietor,
            // professional,
            // compensation_earner
    },
    spouse_atc_code: [{
        type: String
            // II012,
            // II015,
            // II014,
            // II013,
            // II016,
            // II011
    }],
    spouse_foreign_tax_credits: {
        type: Boolean,
        default: false
    },
    spouse_tax_rate: {
        type: String
            // graduated_rates ,
            //  non_operating_income
    },
    taxpayer_prev_tax_due: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule I-Item 46 OR Schedule II-Item 54)
    spouse_prev_tax_due: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule I-Item 46 OR Schedule II-Item 54)
    taxpayer_tax_credit: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule III-Item 62)
    spouse_tax_credit: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule III-Item 62)
    taxpayer_tax_due: {
        type: Number,
        default: 0
    }, //(Item 26 Less Item 27) (From Part V, Item 63)
    spouse_tax_due: {
        type: Number,
        default: 0
    }, //(Item 26 Less Item 27) (From Part V, Item 63)
    taxpayer_total_penalties: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule IV-Item 67)
    spouse_total_penalties: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule IV-Item 67)
    taxpayer_total_amount_payable: {
        type: Number,
        default: 0
    }, // (Sum of Items 28 and 29) (From Part V, Item 68)
    spouse_total_amount_payable: {
        type: Number,
        default: 0
    }, // (Sum of Items 28 and 29) (From Part V, Item 68)
    taxpayer_aggregate_amount_payable: {
        type: Number,
        default: 0
    }, //Sum of Items 30A and 30B
    spouse_aggregate_amount_payable: {
        type: Number,
        default: 0
    }, //Sum of Items 30A and 30B
    particular_cash: [{
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
    particular_check: [{
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
    particular_tax_debit: [{
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
    particular_others: [{
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
    // Part V Graduated IT Rate
    sched1: [{
        taxpayer: [{
            total_sales_revenue: {
                type: Number,
                default: 0
            },
            total_sales_services: {
                type: Number,
                default: 0
            },
            gross_income: {
                type: Number,
                default: 0
            },
            total_allowable_itemized_deductions: {
                type: Number,
                default: 0
            },
            total_standard_deductions: {
                type: Number,
                default: 0
            }, //40% of Item 36
            total_net_income: {
                type: Number,
                default: 0
            },
            total_taxable_income: {
                type: Number,
                default: 0
            },
            total_operation_income: {
                type: Number,
                default: 0
            },
            amount_recieved_share: {
                type: Number,
                default: 0
            },
            total_taxable_income_date: {
                type: Number,
                default: 0
            }, //Sum of Items 41 to 44
            total_tax_due: {
                type: Number,
                default: 0
            }, //(Item 45 x Applicable Tax Rate based on Tax Table below) (To Part III, Item 26)
        }],
        spouse: [{
            total_sales_revenue: {
                type: Number,
                default: 0
            },
            total_sales_services: {
                type: Number,
                default: 0
            },
            gross_income: {
                type: Number,
                default: 0
            },
            total_allowable_itemized_deductions: {
                type: Number,
                default: 0
            },
            total_standard_deductions: {
                type: Number,
                default: 0
            }, //40% of Item 36
            total_net_income: {
                type: Number,
                default: 0
            },
            total_taxable_income: {
                type: Number,
                default: 0
            },
            total_operation_income: {
                type: Number,
                default: 0
            },
            amount_recieved_share: {
                type: Number,
                default: 0
            },
            total_taxable_income_date: {
                type: Number,
                default: 0
            }, //Sum of Items 41 to 44
            total_tax_due: {
                type: Number,
                default: 0
            }, //(Item 45 x Applicable Tax Rate based on Tax Table below) (To Part III, Item 26)
        }]
    }],
    // Part V IT Rate
    sched2: [{
        taxpayer: [{
            total_sales_revenue: {
                type: Number,
                default: 0
            },
            total_operation_income: {
                type: Number,
                default: 0
            },
            total_income_quarter: {
                type: Number,
                default: 0
            }, // (Sum of Items 47 and 48)
            total_allowable_itemized_deductions: {
                type: Number,
                default: 0
            },
            total_standard_deductions: {
                type: Number,
                default: 0
            },
            total_net_income: {
                type: Number,
                default: 0
            },
            total_cumulative_income: {
                type: Number,
                default: 0
            }, //(Sum of Items 49 and 50)
            total_taxable_income_date: {
                type: Number,
                default: 0
            }, //(Item 51 Less Item 52)
            total_tax_due: {
                type: Number,
                default: 0
            }, //(Item 53 x 8% Tax Rate) (To Part III, Item 26)
        }],
        spouse: [{
            total_sales_revenue: {
                type: Number,
                default: 0
            },
            total_operation_income: {
                type: Number,
                default: 0
            },
            total_income_quarter: {
                type: Number,
                default: 0
            }, // (Sum of Items 47 and 48)
            total_allowable_itemized_deductions: {
                type: Number,
                default: 0
            },
            total_standard_deductions: {
                type: Number,
                default: 0
            },
            total_net_income: {
                type: Number,
                default: 0
            },
            total_cumulative_income: {
                type: Number,
                default: 0
            }, //(Sum of Items 49 and 50)
            total_taxable_income_date: {
                type: Number,
                default: 0
            }, //(Item 51 Less Item 52)
            total_tax_due: {
                type: Number,
                default: 0
            }, //(Item 53 x 8% Tax Rate) (To Part III, Item 26)
        }]
    }],
    // Part V Tax Credits/Payments
    sched3: [{
        taxpayer: [{
            year_excess_credits: {
                type: Number,
                default: 0
            },
            payment_previous_quarter: {
                type: Number,
                default: 0
            },
            creditable_tax_withheld: {
                type: Number,
                default: 0
            },
            creditable_tax_withheld_per_bir: {
                type: Number,
                default: 0
            },
            tax_paid_return: {
                type: Number,
                default: 0
            },
            foriegn_tax_credits: {
                type: Number,
                default: 0
            },
            other_tax_credit: {
                type: Number,
                default: 0
            },
            total_tax_credit: {
                type: Number,
                default: 0
            }, //Sum of Items 55 to 61/To Part III, Item 27
        }],
        spouse: [{
            year_excess_credits: {
                type: Number,
                default: 0
            },
            payment_previous_quarter: {
                type: Number,
                default: 0
            },
            creditable_tax_withheld: {
                type: Number,
                default: 0
            },
            creditable_tax_withheld_per_bir: {
                type: Number,
                default: 0
            },
            tax_paid_return: {
                type: Number,
                default: 0
            },
            foriegn_tax_credits: {
                type: Number,
                default: 0
            },
            other_tax_credit: {
                type: Number,
                default: 0
            },
            total_tax_credit: {
                type: Number,
                default: 0
            }, //Sum of Items 55 to 61/To Part III, Item 27
        }]
    }],
    // Part V Penalties
    sched4: [{
        taxpayer: [{
            surcharge: {
                type: Number,
                default: 0
            },
            interest: {
                type: Number,
                default: 0
            },
            compromise: {
                type: Number,
                default: 0
            },
            penalties: {
                type: Number,
                default: 0
            }, //(Sum of Items 64 to 66) (To Part III, Item 29)
            total_amount_payable: {
                type: Number,
                default: 0
            }, //(Sum of Items 63 and 67) (To Part III, Item 30)
        }],
        spouse: [{
            surcharge: {
                type: Number,
                default: 0
            },
            interest: {
                type: Number,
                default: 0
            },
            compromise: {
                type: Number,
                default: 0
            },
            penalties: {
                type: Number,
                default: 0
            }, //(Sum of Items 64 to 66) (To Part III, Item 29)
            total_amount_payable: {
                type: Number,
                default: 0
            }, //(Sum of Items 63 and 67) (To Part III, Item 30)
        }]
    }]
};

var Form1701QSchema = new Schema({
    ...common_model,
    ...model_schema
});

Form1701QSchema.pre('save', function(callback) {
    this.date_created = new Date();
    this.date_modified = new Date();
    callback();
});

Form1701QSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1701QSchema, '1701q_forms', options);
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

module.exports = mongoose.model("1701q_forms", Form1701QSchema);