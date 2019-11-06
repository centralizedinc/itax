/**
 * 
 * @description FORM 1704 (MAY 2001)
 * @author Venus
 * @base_form https://www.bir.gov.ph/images/bir_files/old_files/pdf/30121704%20(MAY2001)%20final.pdf
 * @version 1.0 - 11/05/2019
 *
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    atc_code: { //Item 5
        type: String
            // IC370
    },
    date_incorporation: {
        type: Date
    }, // item 12A
    date_registration: {
        type: Date
    }, //item 12B
    //PART II - Computation of tax
    taxable_income: {
        type: Number,
        default: 0
    }, //Item 13
    add_income_exempt: [{
        description: {
            type: String
        },
        amount: {
            type: Number
        }
    }], //Item 14
    income_gross: [{
        description: {
            type: String
        },
        amount: {
            type: Number
        }
    }], //Item 15
    income_final_tax: [{
        description: {
            type: String
        },
        amount: {
            type: Number
        }
    }], //Item 16
    net_loss_deducted: {
        type: Number,
        default: 0,
    }, //Item 17
    total_taxable_income: {
        type: Number,
        default: 0,
    }, //Item 18 (Sum of Item 13 and Item 17B)
    less_income_tax: {
        type: Number,
        default: 0,
    }, //Item 19
    dividends_paid: {
        type: Number,
        default: 0,
    }, //Item 20
    amount_reserved: {
        type: Number,
        default: 0,
    }, //Item 21 - (See Schedule I)
    improperly_taxable_income: {
        type: Number,
        default: 0,
    }, //Item 22
    part2_tax_rate: {
        type: Number,
        default: 0,
    }, //Item 23
    improperly_earnings_tax: {
        type: Number,
        default: 0,
    }, //Item 24 - (Item 22 multiply by Item 23)   
    community_tax_certificate: {
        type: String
    }, //Item 29
    place_issue: {
        type: String
    }, //Item 30
    date_issue: {
        type: Date
    }, // item 31
    part2_amount: {
        type: Number,
        default: 0,
    }, //Item 32
    // Schedule I
    sched1: [{
        paid_up_capital: {
            type: Number,
            default: 0
        },
        less_accumulated: {
            type: Number,
            default: 0
        },
        allowable_increase: {
            type: Number,
            default: 0
        },
        reserved_definite_corporate: {
            type: Number,
            default: 0
        },
        reserved_building: {
            type: Number,
            default: 0
        },
        reserved_compliance: {
            type: Number,
            default: 0
        },
        earnings_legal: {
            type: Number,
            default: 0
        },
        subsidiaries_foreign: {
            type: Number,
            default: 0
        },
        total_amount_reserved: {
            type: Number,
            default: 0
        } // (to item No. 21)
    }]

};

var Form1704Schema = new Schema({
    ...common_model,
    ...model_schema
});

Form1704Schema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1704Schema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1704Schema, '1704_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1704_forms', Form1704Schema);