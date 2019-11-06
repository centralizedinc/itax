/**
 * 
 * @description FORM 0605 (JULY 1999)
 * @author Venus
 * @base_form https://www.bir.gov.ph/images/bir_files/old_files/pdf/1210605.pdf
 * @version 1.0 - 11/06/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    atc_code: {}, // item 6
    tax_type_code: {}, //Item 8
    //PART I
    manner_payment: [{ // item 17
        voluntary_payment:{
            type: String
            /**
            * Self-Assessment
            * Tax Deposit/Advance Payment
            * Income Tax Second Installment (Individual)
            * Penalties
            * Others (Specify)
            */
        },
        per_audit_account:{
            type: String
            /**
            * Preliminary/Final Assessment/Deficiency Tax
            * Accounts Receivable/Delinquent Account 
            */
        }
    }],
    type_payment:{
        type: String
        /**
        * Installment
        * No. of Installment
        * Partial Payment
        * Full Payment
        */
    },
    // Part 2 - Computation of tax
    part2_basic_tax: { //Item 19
        type: Number,
        default: 0
    },
    part2_total_amount_payable: {
        type: Number,
        default: 0
    }, //Item 21 (Sum of Items 19 & 20D)
    payment_deficiency:{ // Since you have selected Accounts Receivable/Delinquent Account on item 17
        type: String
        /**
        * Pre-approved by Investigating Office
        * Not approved by Investigating Office 
        */
    } 

};

var Form0605Schema = new Schema({
    ...common_model,
    ...model_schema
});

Form0605Schema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form0605Schema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form0605Schema, '0605_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('0605_forms', Form0605Schema);