'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    quarter: {
        type: Number
            /**
             * 1, 2, 3, 4
             */
    },
    line_of_business: {
        type: String
    },
    year_type: {
        type: Date
    },
    year_ended_month: {
        type: Date
    },
    year_ended_year: {
        type: Date
    },
    short_period_return: {
        type: Boolean
    },
    exclusive_vat: [{
        taxable_sales: {
            type: Number,
            default: 0
        }, // item15A Schedule 1
        sale_government: {
            type: Number,
            default: 0
        }, // item16A
        zero_rated: {
            type: Number,
            default: 0
        }, // item17
        exempt_sale: {
            type: Number,
            default: 0
        }, // item18
        total_sale_tax_due: {
            type: Number,
            default: 0
        } // item19A
    }],
    output_tax_due: [{
        taxable_sales: {
            type: Number,
            default: 0
        }, // item15B Schedule 1
        sale_government: {
            type: Number,
            default: 0
        }, // item16B
        total_sale_tax_due: {
            type: Number,
            default: 0
        }, // item19B
        tax_carried_over: {
            type: Number,
            default: 0
        }, // item20A
        tax_deferred_capital: {
            type: Number,
            default: 0
        }, // item20B
        transactional_input_tax: {
            type: Number,
            default: 0
        }, // item20C
        presumptive_input_tax: {
            type: Number,
            default: 0
        }, // item20D
        others_input_tax: {
            type: Number,
            default: 0
        }, // item20E
        total_input_tax: {
            type: Number,
            default: 0
        }, // item20F Sum of Item 20A, 20B, 20C, 20D&20E
        capital_goods_not_exceeding: {
            type: Number,
            default: 0
        }, // item21B Schedule 2
        capital_goods_exceeding: {
            type: Number,
            default: 0
        }, // item21D Schedule 3
        domestic_purchases: {
            type: Number,
            default: 0
        }, // item21F
        importation_capital_goods: {
            type: Number,
            default: 0
        }, // item21H
        domestic_purchase_services: {
            type: Number,
            default: 0
        }, // item21J
        services_rendered_non_residents: {
            type: Number,
            default: 0
        }, // item21L
        others_current_transactions: {
            type: Number,
            default: 0
        }, // item21O
        total_current_purchases: {
            type: Number,
            default: 0
        }, // item22 Sum of item 20F, 21B, 21D, 21F, 21H, 21J, 21L&21O
        input_tax_purchases: {
            type: Number,
            default: 0
        }, // item23A Schedule 3
        input_tax_sale: {
            type: Number,
            default: 0
        }, // item23B Schedule 4
        input_tax_allocable: {
            type: Number,
            default: 0
        }, // item23C Schedule 5
        vat_refund_tcc_claimed: {
            type: Number,
            default: 0
        }, // item23D
        others_deduction_input_tax: {
            type: Number,
            default: 0
        }, // item23E
        total_deduction_input_tax: {
            type: Number,
            default: 0
        }, // item23F Sum of item 23A, 23B, 23C, 23D&23E
        total_allowable_input_tax: {
            type: Number,
            default: 0
        }, // item24 (Item 22 less iem 23F)
        net_vat_payable: {
            type: Number,
            default: 0
        }, // item24 (Item 19B less iem 24)
        monthly_vat_payments: {
            type: Number,
            default: 0
        }, // item26A
        creditable_tax_withheld: {
            type: Number,
            default: 0
        }, // item26B Schedule 6
        adv_payment: {
            type: Number,
            default: 0
        }, // item26C Schedule 7
        vat_withheld_sales: {
            type: Number,
            default: 0
        }, // item26D Schedule 8
        vat_paid_return_previous: {
            type: Number,
            default: 0
        }, // item26E
        adv_payment_made: {
            type: Number,
            default: 0
        }, // item26F (Please attached proof of payments - BIR Form No. 0605)
        others_tax_credits: {
            type: Number,
            default: 0
        }, // item26G
        total_tax_credits: {
            type: Number,
            default: 0
        }, // item26H Sum of item 26A, 26B, 26C, 26D, 26E, 26F&26G
    }],
    purchases_transactions: [{
        capital_goods_not_exceeding: {
            type: Number,
            default: 0
        }, // item21A Schedule 2
        capital_goods_exceeding: {
            type: Number,
            default: 0
        }, // item21C Schedule 3
        domestic_purchases: {
            type: Number,
            default: 0
        }, // item21E
        importation_capital_goods: {
            type: Number,
            default: 0
        }, // item21G
        domestic_purchase_services: {
            type: Number,
            default: 0
        }, // item21I
        services_rendered_non_residents: {
            type: Number,
            default: 0
        }, // item21K
        purchase_not_qualified: {
            type: Number,
            default: 0
        }, // item21M
        others_current_transactions: {
            type: Number,
            default: 0
        }, // item21N
        total_current_purchases: {
            type: Number,
            default: 0
        } // Sum of item 21A, 21C, 21E, 21G, 21I, 21K, 21M&21N
    }],
    sched1: [{
        atc_list: [{
            atc_code: String,
            description: String,
            amount: {
                type: Number,
                default: 0
            },
            tax_rate: {
                type: Number
            },
            output_tax: {
                type: Number,
                default: 0
            }
        }],
    }],
    sched2: [{
        date_purchase: String,
        description: String,
        amount_net_vat: {
            type: Number,
            default: 0
        },
        input_tax: {
            type: Number,
            default: 0
        }
    }],
    sched3: [{
        importations_quarter: [{
            date_purchase: String,
            description: String,
            amount_net_vat: {
                type: Number,
                default: 0
            },
            input_tax: {
                type: Number,
                default: 0
            },
            est_life: String,
            recognize_life_months: String,
            allowable_input_tax_period: {
                type: Number,
                default: 0
            },
            balance_input_tax_period: {
                type: Number,
                default: 0
            },
            total_purchase: {
                type: Number,
                default: 0
            }
        }],
        importations_previous_quarter: [{
            date_purchase: String,
            description: String,
            amount_net_vat: {
                type: Number,
                default: 0
            },
            input_tax: {
                type: Number,
                default: 0
            },
            est_life: String,
            recognize_life_months: String,
            allowable_input_tax_period: {
                type: Number,
                default: 0
            },
            balance_input_tax_period: {
                type: Number,
                default: 0
            },
            total_input_tax: {
                type: Number,
                default: 0
            }
        }]
    }],
    sched4: [],
    sched5: [],
    sched6: [{
        period_covered: String,
        name_withholding_agent: String,
        income_payment: {
            type: Number,
            default: 0
        },
        total_tax_withheld: {
            type: Number,
            default: 0
        },
        applied: [{
            previuos_two_months: String,
            current_months: String
        }],
        total_tax_withheld_claimed: {
            type: Number,
            default: 0
        }
    }],
    sched7: [{
        period_covered: String,
        name_withholding_agent: String,
        income_payment: {
            type: Number,
            default: 0
        },
        total_tax_withheld: {
            type: Number,
            default: 0
        },
        applied: [{
            previuos_two_months: String,
            current_months: String
        }],
        total_adv_payment: {
            type: Number,
            default: 0
        }
    }],
    sched8: [{
        period_covered: String,
        name_withholding_agent: String,
        income_payment: {
            type: Number,
            default: 0
        },
        total_tax_withheld: {
            type: Number,
            default: 0
        },
        applied: [{
            previuos_two_months: String,
            current_months: String
        }],
        total_withheld_sales_government: {
            type: Number,
            default: 0
        }
    }]
};

var Form2550qSchema = new Schema({
    ...common_model,
    ...model_schema
});

Form2550qSchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form2550qSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form2550qSchema, '2550q_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('2550q_forms', Form2550qSchema);