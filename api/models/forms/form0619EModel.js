/**
 * 
 * @description FORM 0619E (JANUARY 2018)
 * @author Venus
 * @base_form https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/0619-E%20Jan%202018%20rev%20final.pdf
 * @version 1.0 - 11/06/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    atc_code: { //Item 5
        type: String
            // WME10
    },
    tax_type_code: { //Item 6
        type: String
            // WE
    },
    //PART I
    category_of_agent: { // item 12
        type: String
        /**
         * government
         * private
         */
    },
    // Part 2 - Tax Remittance
    part2_amount_remittance: { //Item 14
        type: Number,
        default: 0
    },
    less_amount_remitted: { //Item 15
        type: Number,
        default: 0
    },
    net_amount_remittance: { //Item 16 (Item 14 Less Item 15) 
        type: Number,
        default: 0
    },
    part2_total_amount_remittance: {
        type: Number,
        default: 0
    } //Item 18 (Sum of Items 16 and 17D)

};

var Form0619ESchema = new Schema({
    ...common_model,
    ...model_schema
});

Form0619ESchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form0619ESchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form0619ESchema, '0619e_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('0619e_forms', Form0619ESchema);