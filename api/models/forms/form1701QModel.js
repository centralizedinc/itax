"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    taxpayer_atc_code: {
        type: String
            // II012,
            // II015,
            // II014,
            // II017,
            // II013,
            // II016
    },
    taxpayer_foreign_tax_number: {
        type: String
    },
    taxpayer_foreign_tax_credits: {
        type: Boolean
            // taxCredits
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
    spouse_filer_type: [], //item19
    /**
     * SP - single_proprietor
     * P - professional
     * CE - compensation earner
     */
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
    spouse_foreign_tax_number: {
        type: String
    },
    spouse_tax_rate: {
        type: String
            // graduated_rates ,
            //  non_operating_income
    },
    taxpayer_prev_tax_due: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule I-Item 46 OR Schedule II-Item 54) 26a
    spouse_prev_tax_due: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule I-Item 46 OR Schedule II-Item 54) 26b
    taxpayer_tax_credit: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule III-Item 62) 27a
    spouse_tax_credit: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule III-Item 62) 27b
    taxpayer_tax_due: {
        type: Number,
        default: 0
    }, //(Item 26 Less Item 27) (From Part V, Item 63) 28a
    spouse_tax_due: {
        type: Number,
        default: 0
    }, //(Item 26 Less Item 27) (From Part V, Item 63) 28b
    taxpayer_total_penalties: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule IV-Item 67) 29a
    spouse_total_penalties: {
        type: Number,
        default: 0
    }, //(From Part V, Schedule IV-Item 67) 29b
    taxpayer_total_amount_payable: {
        type: Number,
        default: 0
    }, // (Sum of Items 28 and 29) (From Part V, Item 68) 30a
    spouse_total_amount_payable: {
        type: Number,
        default: 0
    }, // (Sum of Items 28 and 29) (From Part V, Item 68) 30b
    taxpayer_aggregate_amount_payable: {
        type: Number,
        default: 0
    }, //Sum of Items 30A and 30B (31)
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
    sched1: {
        taxpayer: {
            total_sales_revenue: {
                type: Number,
                default: 0
                    // 36
            },
            total_sales_services: {
                type: Number,
                default: 0
                    // 37
            },
            gross_income: {
                type: Number,
                default: 0
                    // 38
            },
            total_allowable_itemized_deductions: {
                type: Number,
                default: 0
                    // 39
            },
            total_standard_deductions: {
                type: Number,
                default: 0
            }, //40% of Item 36
            total_net_income: {
                type: Number,
                default: 0
                    // 41
            },
            total_taxable_income: {
                type: Number,
                default: 0
                    // 42
            },
            total_operation_income: {
                type: Number,
                default: 0
                    // 43
            },
            amount_recieved_share: {
                type: Number,
                default: 0
                    // 44
            },
            total_taxable_income_date: {
                type: Number,
                default: 0
            }, //Sum of Items 41 to 44
            total_tax_due: {
                type: Number,
                default: 0
            }, //(Item 45 x Applicable Tax Rate based on Tax Table below) (To Part III, Item 26)
        },
        spouse: {
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
        }

    },
    // Part V IT Rate
    sched2: {
        taxpayer: {
            total_sales_revenue: {
                type: Number,
                default: 0
                    // 47
            },
            total_operation_income: {
                type: Number,
                default: 0
                    // 48
            },
            total_income_quarter: {
                type: Number,
                default: 0
                    // 49
            }, // (Sum of Items 47 and 48)
            previous_quarter_taxable_income: {
                type: Number,
                default: 0
                    // 50
            },
            total_cumulative_income: {
                type: Number,
                default: 0
                    // 51
            }, //(Sum of Items 49 and 50)
            less_allowable_reduction: {
                type: Number,
                default: 0
                    //52 
            },
            total_taxable_income_date: {
                type: Number,
                default: 0
                    // 53
            }, //(Item 51 Less Item 52)
            total_tax_due: {
                type: Number,
                default: 0
                    // 54
            }, //(Item 53 x 8% Tax Rate) (To Part III, Item 26)
        },
        spouse: {
            total_sales_revenue: {
                type: Number,
                default: 0
                    // 47
            },
            total_operation_income: {
                type: Number,
                default: 0
                    // 48
            },
            total_income_quarter: {
                type: Number,
                default: 0
                    // 49
            }, // (Sum of Items 47 and 48)
            previous_quarter_taxable_income: {
                type: Number,
                default: 0
                    // 50
            },
            total_cumulative_income: {
                type: Number,
                default: 0
                    // 51
            }, //(Sum of Items 49 and 50)
            less_allowable_reduction: {
                type: Number,
                default: 0
                    //52 
            },
            total_taxable_income_date: {
                type: Number,
                default: 0
                    // 53
            }, //(Item 51 Less Item 52)
            total_tax_due: {
                type: Number,
                default: 0
                    // 54
            }, //(Item 53 x 8% Tax Rate) (To Part III, Item 26)
        }
    },
    // Part V Tax Credits/Payments
    sched3: {
        taxpayer: {
            year_excess_credits: {
                type: Number,
                default: 0
                    // 55
            },
            payment_previous_quarter: {
                type: Number,
                default: 0
                    // 56
            },
            creditable_tax_withheld: {
                type: Number,
                default: 0
                    // 57
            },
            creditable_tax_withheld_per_bir: {
                type: Number,
                default: 0
                    // 58
            },
            tax_paid_return: {
                type: Number,
                default: 0
                    // 59
            },
            foriegn_tax_credits: {
                type: Number,
                default: 0
                    // 60
            },
            other_tax_credit: {
                type: Number,
                default: 0
                    // 61
            },
            total_tax_credit: {
                type: Number,
                default: 0
                    // 62
            }, //Sum of Items 55 to 61/To Part III, Item 27
        },
        spouse: {
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
        }
    },
    // Part V Penalties
    sched4: {
        taxpayer: {
            surcharge: {
                type: Number,
                default: 0
                    // 64
            },
            interest: {
                type: Number,
                default: 0
                    // 65
            },
            compromise: {
                type: Number,
                default: 0
                    // 66
            },
            penalties: {
                type: Number,
                default: 0
                    // 67
            }, //(Sum of Items 64 to 66) (To Part III, Item 29)
            total_amount_payable: {
                type: Number,
                default: 0
                    // 68
            }, //(Sum of Items 63 and 67) (To Part III, Item 30)
        },
        spouse: {
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
        }
    }
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
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});

module.exports = mongoose.model("1701q_forms", Form1701QSchema);