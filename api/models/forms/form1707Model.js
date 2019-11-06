/**
 * 
 * @description FORM 1707 (JANUARY 2018)
 * @author Venus
 * @base_form https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1707%20January%202018%20ENCS.pdf
 * @version 1.0 - 11/06/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    date_transaction: {
        type: Date
    },
    atc_code: { //Item 3
        type: String
            // II030
            // IC110
    },
    //PART I
    description_transaction: { //Item 15
        type: String
            /**
             * 1 - Cash Sales
             * 2 - Installment Sale - (Fill out Part IV-Schedule 1)
             * 3 - Foreclosure Sale
             * Others Specify 
             */
    },
    // Part2 - Computation of tax
    part2_taxable_base: { //Item 10 (From Part IV Schedule 2)
        type: Number,
        default: 0
    },
    less_allowable_cost: { //Item 11 (From Part IV Schedule 3 ) 
        type: Number,
        default: 0
    },
    net_capital_gain: { //Item 12 (Item 10 Less Item 11) 
        type: Number,
        default: 0
    },
    part2_tax_due_transaction: { //Item 13 (Cash Sale/Foreclosure Sale) (Item 12 Multiply by Applicable Tax Rate) 
        type: Number,
        default: 0
    },
    part2_tax_due_payment: { //Item 14 (From Part IV Schedule 1 Item 7) 
        type: Number,
        default: 0
    },
    less_tax_paid: { //Item 15 
        type: Number,
        default: 0
    },
    part2_tax_payable: {
        type: Number,
        default: 0
    }, //Item 16  (Item 13 or 14 less Item 15)
    part2_total_amount_payable: {
        type: Number,
        default: 0
    }, //Item 18 (Sum of Items 16 and 17D)
    // Part 4 Schedule 1 - Installment Sale
    sched1: [{
        selling_price: {
            type: Number,
            default: 0
        },
        cost_expenses: {
            type: Number,
            default: 0
        },
        mortgage_assumed: {
            type: Number,
            default: 0
        },
        no_installment: {
            type: Number,
            default: 0
        },
        amount_installment: {
            type: Number,
            default: 0
        },
        applicable__rate: {
            type: Number,
            default: 0
        },
        sched1_tax_due: { // (Item 5 Multiply by Item 6)(To Part II, Item 14) 
            type: Number,
            default: 0
        },
        date_collection: {
            type: Date
        },
        sched1_total_collection: {
            type: Number,
            default: 0
        },
    }],
    // Schedule 2 - Description of Shares of Stocks
    sched2: [{
        name_corporate_stock: {
            type: String
        },
        number_shares: {
            type: String
        },
        stock_certificate_no: {
            type: String
        },
        sched2_taxable_base: {
            type: Number,
            default: 0
        },
        sched2_total_amount: { // (To Part II Item 10) 
            type: Number,
            default: 0
        },
    }],
    sched3: [{
        description: {
            type: String
        },
        amount: {
            type: Number
        },
        sched3_total_amount: { // (To Part II Item 11) 
            type: Number,
            default: 0
        },
    }]

};

var Form1707Schema = new Schema({
    ...common_model,
    ...model_schema
});

Form1707Schema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1707Schema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1707Schema, '1707_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1707_forms', Form1707Schema);