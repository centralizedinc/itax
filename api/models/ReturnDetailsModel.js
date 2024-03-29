'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReturnsDetailsSchema = new Schema({
        tin: String,
        reference_no: String,
        form_type: String,
        tax_type: String, // IT, VT, WT
        return_period: Date,
        due_date: Date,
        filing_status: String,
        rdo_code: String, // RDO Code
        payment_status: {
                type: String,
                default: 'unpaid'
        },
        tax_due: Number,
        total_amount_payable: Number,
        total_penalties: Number,
        date_filed: Date,
        date_created: {
                type: Date,
                default: new Date()
        },
        date_modified: {
                type: Date,
                default: new Date()
        },
        created_by: {
                type: String
        },
        modified_by: {
                type: String
        }
});

ReturnsDetailsSchema.pre('save', function (callback) {
        var form = this;
        // form.date_created = new Date();
        form.date_modified = new Date();
        callback();
});

ReturnsDetailsSchema.pre('findOneAndUpdate', function (callback) {
        console.log('this :', this._update);
        this.options.new = true;
        this.options.runValidators = true;
        this._update.date_modified = new Date();
        callback();
});

module.exports = mongoose.model('return_details', ReturnsDetailsSchema);