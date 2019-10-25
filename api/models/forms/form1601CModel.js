/**
 * 
 * @description FORM 1601C (JANUARY 2018)
 * @author Venus
 * @base_form https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1601C%20final%20Jan%202018%20with%20DPA.pdf
 * @version 1.0 - 10/14/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    taxes_withheld: {
        type: Boolean
    },
    category_of_agent: {
        type: String
    },
    atc_code: {
        type: String
    }, // WW010
    compensation: {
        type: Number,
        default: 0
    }, //item14
    statutory_minimum_wage: {
        type: Number,
        default: 0
    }, //item15
    minimum_wager: {
        type: Number,
        default: 0
    },
    hazard_pay: {
        type: Number,
        default: 0
    }, //item16 for MWEs only
    other_benefits: {
        type: Number,
        default: 0
    }, //item17 
    minimis_benefits: {
        type: Number,
        default: 0
    }, //item18
    mandatory_contribution: {
        type: Number,
        default: 0
    }, //item19
    other_taxable_compensation: {
        type: Number,
        default: 0
    }, //item20
    non_taxable_compensation: {
        type: Number,
        default: 0
    }, //item21 Sum of Items 15 to 20
    total_taxable_compensation: {
        type: Number,
        default: 0
    }, //item22 Item 14 Less Item 21
    less_taxable_compensation: {
        type: Number,
        default: 0
    }, //item23 for employees, other than MWEs, recieving 250,000 & below for the year
    net_taxable_required: {
        type: Number,
        default: 0
    }, //item24 item 22 less item 23
    total_taxes_withheld: {
        type: Number,
        default: 0
    }, //item25
    adjustment: {
        type: Number,
        default: 0
    }, //item26 From Part IV-Schedule 1, Item 4
    tax_required_remittance: {
        type: Number,
        default: 0
    }, //item27 Sum of Items 25 and 26
    tax_remitted_previously: {
        type: Number,
        default: 0
    }, //item28 
    other_payments_made: {
        type: Number,
        default: 0
    }, //item29
    total_payments_made: {
        type: Number,
        default: 0
    }, //item30 Sum of Items 28 and 29
    refund_type: {
        type: String
    },
    adv_payment: {
        type: Number,
        default: 0
    },
    total_tax_credits: {
        type: Number,
        default: 0
    },
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
    //Schedule 1 Adjustment of Taxes Withheld
    sched1: [{
        previous_month: {
            type: Date,
            default: new Date()
        },
        date_paid: { //(Excluding Penalties for the Month)
            type: Date,
            default: new Date()
        },
        drawee_bank: {
            type: Number,
            default: 0
        },
        number: {
            type: Number,
            default: 0
        },
        tax_paid: {
            type: Number,
            default: 0
        },
        Adjustments: {
            type: Number,
            default: 0
        }
    }],
};

var Form1601CSchema = new Schema({
    ...common_model,
    ...model_schema
});

Form1601CSchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1601CSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1601CSchema, '1601c_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1601c_forms', Form1601CSchema);