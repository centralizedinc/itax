'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
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
    line_of_business: {
        type: String
    },

    //Part 2 Computation of Tax
    taxable_transactions: {
        type: Number,
        default: 0
    }, //item14A - item18A
    atc_list: [], //item14B - item18B
    taxable_amount: {
        type: Number,
        default: 0
    }, //item14C - Item18C
    tax_rate: {
        type: Number,
        default: 0
    }, //item14D - Item18D
    computation_tax_due: {
        type: Number,
        default: 0
    }, //item14E - Item18E
    creditable_percentage: {
        type: Number,
        default: 0
    }, //item20A see Schedule 1
    tax_paid_return_previously: {
        type: Number,
        default: 0
    }, //item20B
    total_tax_credit_payment: {
        type: Number,
        default: 0
    }, //item21 Sum of items20A&20B
    tax_payable: {
        type: Number,
        default: 0
    }, //item22 overpayment Item19 less item21
    refund_type: {
        type: String
    }, //item24 if overpayment

    //Part 3 Details Payment
    particular_cash: [{ //item27A
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
    particular_check: [{ //item28A
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
    particular_tax_debit: [{ //item29A
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
    particular_others: [{ //item30A
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
    //Schedule 1 Tax withheld claimed as Tax Credits
    sched1: [{
        period_covered: {
            type: Date
        },
        name_withholding: String,
        income_payments: {
            type: Number,
            default: 0
        },
        tax_withheld: {
            type: Number,
            default: 0
        },
        applied: {
            type: Number,
            default: 0
        },
        total_amount_payable: {
            type: Number,
            default: 0
        } // to item20A
    }]
};

var Form2551MSchema = new Schema({
    ...common_model,
    ...model_schema
});

Form2551MSchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form2551MSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form2551MSchema, '2551m_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('2551m_forms', Form2551MSchema);