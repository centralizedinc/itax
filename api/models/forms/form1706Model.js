/**
 * 
 * @description FORM 1706 (JULY 1999)
 * @author Kris
 * @base_form https://www.bir.gov.ph/images/bir_files/old_files/pdf/30231706.pdf
 * @version 1.0 - 10/30/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    atc_code: { //Item 4
        type: String
    }, // WI155
    location_of_property: { //Item 14
        type: String
    },
    //PART I
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

    tct_no: { //Item 16
        type: String
    },
    area_sold: {//Item 16
        type: String
    },
    tax_dec_no: {//Item 16
        type: String
    },
    others: {//Item 16
        type: String
    },

    sold_as_principal_property: { //Item 17
        type: Boolean,
        default: false
    },
    intend_construct_acquire: { //Item 18
        type: Boolean,
        default: false
    },
    selling_price_cover: { //Item 20
        type: Boolean,
        default: false
    },
    description_transaction: { //Item 21
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
    description_transaction_specify: { //Item 21 specify
        type: String
    },
    selling_price: { type: Number, default: 0 }, //Item 22
    cost_expenses: { type: Number, default: 0 }, //Item 23
    mortgage_assumed: { type: Number, default: 0 }, //Item 24
    total_payments_initial_year: { type: Number, default: 0 }, //Item 25
    amount_installment_month: { type: Number, default: 0 }, //Item 26
    total_no_installment_month: { type: Number, default: 0 }, //Item 27
    date_of_installment: { type: Date, default: new Date }, //Item 28

    //Item 29 Fair Market Value (FMV)
    item29: {
        tax_declaration_land: { type: Number, default: 0 }, //Item 29A
        tax_declaration_improvements: { type: Number, default: 0 },// Item 29B
        zonal_value: { type: Number, default: 0 }, //Item 29C
        commissioner: { type: Number, default: 0 }, //Item 29D
    },
    //Item 30 Determination of Taxable Base
    item30: {
        gross_selling_price: { type: Number, default: 0 }, //Item 30A
        bid_price: { type: Number, default: 0 }, //Item 30B
        fair_market_value: { type: Number, default: 0 }, //Item 30C 
        installment_collected: { type: Number, default: 0 }, //Item 30D
        unutilized_portion_sales: { type: Number, default: 0 },
        others: { type: String }, // Item 30F
        computation: { type: String },
        computation2: { type: String }
    },
    //Part II
    tax_base: { type: Number, default: 0 }, //Item 31
    tax_due: { type: Number, default: 0 }, //Item 32
    less_tax_paid: { type: Number, default: 0 }, //Item 33
    tax_payable_overpayment: { type: Number, default: 0 },
    sched1: {}

};

var Form1706Schema = new Schema({ ...common_model, ...model_schema });

Form1706Schema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1706Schema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1706Schema, '1706_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1706_forms', Form1706Schema);