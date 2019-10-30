/**
 * 
 * @description FORM 1606 (JULY 1999)
 * @author Kris
 * @base_form https://www.lawphil.net/administ/bir/frms/pymnt/1606.pdf
 * @version 1.1 - 10/30/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    taxes_withheld: { //Item 4
        type: Boolean
    },
    //Part I
    atc_code: { //Item 13
        type: String
    }, // WI155
    category_of_agent: { //Item 14
        type: String
    },
    classification_property: { //Item 15
        type: String
        /**
         * 1 - Residential
         * 2 - Agricultural
         * 3 - Commercial
         * 4 - Industrial
         * 5 - Condominium Residential
         * 6 - Condominium Commercial
         * Others Specify 
         */
    },
    classification_property_specify: { //Item 15
        type: String
    },
    location_property: { //Item 16
        type: String
    },
    // location_rdo_code: { // ??????????????
    //     type: String
    // },
    brief_descriptio: { //Item 17
        tct_no: { 
            type: String
        },
        area_sold: {
            type: String
        },
        tax_dec_no: {
            type: String
        },
        others:{
            type: String
        }
    },  
    selling_price_property: { //Item 18
        type: Boolean,
        default: false
    },
    description_transaction: { //Item 20
        type: String
        /**
         * 1 - Cash Sales
         * 2 - Excempt
         * 3 - Installment Sale
         * 4 - Foreclosure Sale
         * 5 - Others
         * If excempt or Others please specify
         */
    },
    description_transaction_specify:{ //Item 20 specify
        type: String
    },
    selling_price: { type: Number, default: 0 }, //Item 21
    cost_expenses: { type: Number, default: 0 }, //Item 22
    mortgage_assumed: { type: Number, default: 0 }, //Item 23
    total_payments_initial_year: { type: Number, default: 0 }, //Item 24
    amount_installment_month: { type: Number, default: 0 }, //Item 25
    total_no_installment_month:{ type: Number, default: 0 }, //Item 26

    //Item 27 Fair Market Value (FMV)
    item27:{
        tax_declaration_land: { type: Number, default: 0 }, //Item 27A
        tax_declaration_improvements: { type: Number, default: 0 },// Item 27B
        zonal_value: { type: Number, default: 0 }, //Item 27C
        commissioner: { type: Number, default: 0 }, //Item 27D
    },
    //Item 28 Determination of Taxable Base
    item28:{
        gross_selling_price: { type: Number, default: 0 }, //Item 28A
        fair_market_value: { type: Number, default: 0 }, //Item 28B Sum of 27A & 27B/ 27C & 27D/ 27B & 27C/27A & 27D whichever is higher
        bid_price: { type: Number, default: 0 }, //Item 28C
        installment_collected: { type: Number, default: 0 }, //Item 28D //Installment Sale excluding interest
        others:{ type: String }, // Item 28E
        computation:{ type: String},
        computation2:{ type: String}
    },

    seller_hab_eng:{type: Boolean}, //Item 29
    tax_base:{ type: Number, default: 0 }, //Item 30
    tax_rate:{ type: Number, default: 0 }, //Item 31
    tax_req_withheld:{ type: Number, default: 0 }, //Item 32
    less_tax_paid:{ type: Number, default: 0 }, //Item 33
    tax_due:{ type: Number, default: 0 }, //Item 34


    //Part III
    // taxable_base_computation: { type: Number, default: 0 }, //Item 30
    // particular_cash: [{
    //     drawee_bank: {
    //         type: Number,
    //         default: 0
    //     },
    //     number: {
    //         type: Number,
    //         default: 0
    //     },
    //     date: {
    //         type: Date
    //     },
    //     amount: {
    //         type: Number,
    //         default: 0
    //     }
    // }],
    // particular_check: [{
    //     drawee_bank: {
    //         type: Number,
    //         default: 0
    //     },
    //     number: {
    //         type: Number,
    //         default: 0
    //     },
    //     date: {
    //         type: Date
    //     },
    //     amount: {
    //         type: Number,
    //         default: 0
    //     }
    // }],
    // particular_tax_debit: [{
    //     drawee_bank: {
    //         type: Number,
    //         default: 0
    //     },
    //     number: {
    //         type: Number,
    //         default: 0
    //     },
    //     date: {
    //         type: Date
    //     },
    //     amount: {
    //         type: Number,
    //         default: 0
    //     }
    // }],
    // particular_others: [{
    //     drawee_bank: {
    //         type: Number,
    //         default: 0
    //     },
    //     number: {
    //         type: Number,
    //         default: 0
    //     },
    //     date: {
    //         type: Date
    //     },
    //     amount: {
    //         type: Number,
    //         default: 0
    //     }
    // }],
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