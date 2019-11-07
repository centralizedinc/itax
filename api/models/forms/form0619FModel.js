/**
 * 
 * @description FORM 0619F (JANUARY 2018)
 * @author Venus
 * @base_form https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/0619-F%20Jan%202018%20rev%20final.pdf
 * @version 1.0 - 11/06/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    tax_type_code: { //Item 5
        type: String
            // WB
            // WF
    },
    //PART I
    category_of_agent: { // item 11
        type: String
        /**
         * government
         * private
         */
    },
    // Part 2 - Tax Remittance
    atc:[{
        remittance_interest_paid: { //Item 13
        type: Number,
        default: 0i
    },
    remittance_final_income: { //Item 14
        type: Number,
        default: 0
    }
    }],
    total_tax_remittance: { //Item 15 (Sum of Items 13 and 14)
        type: Number,
        default: 0
    },
    less_amount_remitted: { //Item 16
        type: Number,
        default: 0
    },
    net_amount_remittance: { //Item 17 (Item 15 Less Item 16) 
        type: Number,
        default: 0
    },
    part2_total_amount_remittance: {
        type: Number,
        default: 0
    } //Item 19 (Sum of Items 17 and 18D)
};

var Form0619FSchema = new Schema({
    ...common_model,
    ...model_schema
});

Form0619FSchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form0619FSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form0619FSchema, '0619f_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('0619f_forms', Form0619FSchema);