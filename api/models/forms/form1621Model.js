/**
 * 
 * @description FORM 1621 (JANUARY 2019)
 * @author Venus
 * @base_form https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1621%20Jan%202019%20final.pdf
 * @version 1.0 - 11/04/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
var common_model = require('./commonModels');

const model_schema = {
    taxes_withheld: { // item 4
        type: Boolean
    },
    category_of_agent: {
        type: String
            /**
             * government
             * private
             */
    },
    // Part II Summary of Remittances
    atc_code: { //Item 13
        type: String
    }, // WI165
    tax_base:{ 
        type: Number
    },
    tax_rate:{ 
        type: Number
    },
    tax_withheld:{  // from Part IV item 6 - column F
        type: Number,
        default: 0
    },
    less_remittances_first_month:{ 
        type: Number,
        default: 0
    },
    less_remittances_two_month:{ 
        type: Number,
        default: 0
    },
    tax_remittanced_return_previous:{ 
        type: Number,
        default: 0
    },
    total_remittances:{ // Sum of items 14 to item 16
        type: Number,
        default: 0
    },


    /**
    Part III - Details of Payment
     */

    // Schedule 1 details of tax withheld
    sched1: [{
        sched1_seq_no: {
            type: Number
        },
        sched1_name_estate: {
            type: String
        },
        sched1_tin: {
            type: String
        },
        sched1_date_decedents: {
            type: Date,
            default: new Date()
        },
        sched1_withdrawn_amount: {
            type: Number
        },
        sched1_amount_tax_withheld: {
            type: Number,
            default: 0
        },
        sched1_date_withheld: {
            type: Date,
            default: new Date()
        },
        sched1_total_taxes_withheld: {  // Sum of item 1 to 5 - To Part II Item 13
            type: Number,
            default: 0
        }
    }]
};

var Form1621Schema = new Schema({
    ...common_model,
    ...model_schema
});

Form1621Schema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1621Schema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1621Schema, '1621_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1621_forms', Form1621Schema);