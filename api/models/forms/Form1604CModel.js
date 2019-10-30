/**
 * 
 * @description FORM 1604C (JANUARY 2018)
 * @author Mark
 * @base_form https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1604-C%20Jan%202018%20Final.pdf
 * @version 1.0 - 10/30/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
var common_model = require('./commonModels');

const model_schema = {
    // Part I
    top_withholding_agent: { // item 8A
        type: Number
    },
    is_refund_released: { // item 11
        type: Boolean
    },
    date_of_refund: { // item 11A
        type: Date
    },
    total_overremittance_amount: { // item 12
        type: Number
    },
    overremittance_first_crediting_month: { // item 13
        type: String
    },
    

    // Part II
    part2: [{
        month: { // Month
            type: String
        },
        date_remittance: { // Date of Remittance
            type: Date
        },
        drawee_bank: { // Drawee Bank/Bank Code/Agency
            type: String
        },
        tra_number: { // TRA/eROR/eAR Number
            type: String
        },
        taxes_withheld: { // Taxes Withheld
            type: Number
        },
        adjustment: { // Adjustment
            type: Number
        },
        penalties: { // Penalties
            type: Number
        },
        total_amount_remitted: { // Total Amount Remitted
            type: Number
        }
    }]
};

var Form1604CSchema = new Schema({ ...common_model, ...model_schema });

Form1604CSchema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1604CSchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1604CSchema, '1604c_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1604c_forms', Form1604CSchema);
