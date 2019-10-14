'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Form1603Schema = new Schema({
    reference_no: Number,
    return_period_year: String,
    return_period_month: String,
    return_period: String,
    quarter: String,
    amended_yn: Boolean,
    opn_yn: String,
    reflected: String,
    category_of_agent: String,
    opt_treaty: String,
    special_rate_yn: String,
    international_treaty_yn: String,
    monetary_value: { type: Number, default: 0 },
    taxable_amount: { type: Number, default: 0 },
    compute_monetary_value: { type: Number, default: 0 },
    compute_tax_due: { type: Number, default: 0 },
    percentDivStr: Number,
    amtDueCrdtb: Number,
    prevTaxPidCrdtb: Number,
    amtPayblCrdtb: Number,
    surcharge: Number,
    interest: Number,
    compromise: Number,
    penaltiesCrdtb: Number,
    totalAmtPayblCrdtb: Number,
    refundType: String,
    advPayment: Number,
    totTaxCredits: Number,
    ifOverremittance: String,
    // atcList: [{
    //     seqNo: Number,
    //     atcCode: String,
    //     payeeFlag: String,
    //     txbleAmt: Number,
    //     taxRate: Number,
    //     taxDue: Number,
    //     description: String
    // }],
    dateFiled: Date,
    dueDate: Date
});


Form1603Schema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1603Schema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1601CSchema, '1603_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin()
    .then(() => {
        console.log("############### init plugin")
    })
    .catch(e => {
        // Plugin failed to initialise
        console.log("############### init failed: " + e);
    });


module.exports = mongoose.model('1603_forms', Form1603Schema);