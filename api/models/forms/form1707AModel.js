/**
 * 
 * @description FORM 1707A (JULY 1999)
 * @author Kris
 * @base_form https://www.bir.gov.ph/images/bir_files/old_files/pdf/30371707-A(062101)(final).pdf
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
    }, 
    // category_of_agent: { //Item 14
    //     type: String
    // },
    //PART II
    tot_capital_gain:{type: Number, default: 0}, //Item 12
    tot_capital_loss:{type: Number, default: 0}, //Item 13
    net_capital_gain:{type: Number, default: 0,}, //Item 14
    prev_tax_due:{type: Number, default: 0,}, //Item 15
    less_tot_tax_paid:{type: Number, default: 0,}, //Item 16
    tax_due:{type: Number, default: 0,}, //Item 17
    //penalties Item 18
    tot_amt_payable:{type: Number, default: 0,}, //Item 19
    // Schedule I
    sched1:[{
        date:{type: Date}, // Item a
        corporate_stock:{type: String}, // Item b
        selling_price:{type: Number, default: 0}, // Item c
        cost:{type: Number, default: 0}, // Item d
        capital_gain:{type: Number, default: 0}, // Item e
        tax_paid:{type: Number, default: 0}// Item f
    }],
    item20_tot_c:{type: Number, default: 0}, //Item20c 
    item20_tot_d:{type: Number, default: 0}, //Item20d
    item20_tot_e:{type: Number, default: 0}, //Item20e
    item20_tot_f:{type: Number, default: 0}, //Item20f
    // Schedule II
    sched2:[{
        date:{type: Date}, //Item a
        corporate_stock:{type: String},// Item b
        selling_price:{type: Number, default: 0},// Item c
        cost:{type: Number, default: 0}, //Item d
        capital_loss:{type: Number, default: 0}, //Iteme
    }],
    item21_tot_c:{type: Number, default: 0}, //Item21c
    item21_tot_d:{type: Number, default: 0}, //Item21d
    item21_tot_e:{type: Number, default: 0}, //Item21e

};

var Form1707ASchema = new Schema({...common_model, ...model_schema });

Form1707ASchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1707ASchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1707ASchema, '1707a_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1707a_forms', Form1707ASchema);