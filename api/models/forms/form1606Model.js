/**
 * 
 * @description FORM 1606 (JULY 1999)
 * @author Venus
 * @base_form https://www.lawphil.net/administ/bir/frms/pymnt/1606.pdf
 * @version 1.0 - 10/15/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    category_of_agent: {
        type: String
    },
    atc_code: {
        type: String
    }, // WI155
    taxes_withheld: {
        type: Boolean
    },
    classification_property: {
        type: String
    },
    location_property: {
        type: String
    },
    location_rdo_code: {
        type: String
    },
    tct_no: {
        type: String
    },
    area_sold: {
        type: String
    },
    selling_price_property: {
        type: Boolean,
        default: false
    },
    description_transaction: {
        type: String
    },
    selling_price: { type: Number, default: 0 },
    cost_expenses: { type: Number, default: 0 },
    mortgage_assumed: { type: Number, default: 0 },
    total_payments_initial_year: { type: Number, default: 0 },
    amount_installment_month: { type: Number, default: 0 },
    tax_declaration_land: { type: Number, default: 0 },
    tax_declaration_improvements: { type: Number, default: 0 },
    zonal_value: { type: Number, default: 0 },
    commissioner: { type: Number, default: 0 },
    gross_selling_price: { type: Number, default: 0 },
    fair_market_value: { type: Number, default: 0 }, // Sum of 27A & 27B/ 27C & 27D/ 27B & 27C/27A & 27D whichever is higher
    bid_price: { type: Number, default: 0 },
    installment_collected: { type: Number, default: 0 }, //Installment Sale excluding interest
    taxable_base_computation: { type: Number, default: 0 },
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
};

var Form1606Schema = new Schema({...common_model, ...model_schema });

Form1606Schema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1606Schema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1606Schema, '1606_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1606_forms', Form1606Schema);