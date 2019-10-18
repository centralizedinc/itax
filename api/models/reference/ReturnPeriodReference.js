const mongoose = require('mongoose')

const ReturnPeriodSchema = new mongoose.Schema({
    form: {
        type: String
    },
    form_type: {
        type: String
    },
    period_type: {
        type: String
        /**
         * o - one time
         * m - monthly
         * q - quarterly
         * a - annual
         */
    },
    is_calendar: {
        type: Boolean,
        default: false
    },
    month_offset: {
        type: Number
    },
    day_offset: {
        type: Number
        /**
         * if + ? add from the start of the month which is 0
         * else if - ? substract from end of the month
         */
    },
    status: {
        type: String,
        default: 'A'
        /**
         * A - ACTIVE
         * I - INACTIVE
         */
    },
    created_by: {
        type: String
    },
    modified_by: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    date_modified: {
        type: Date,
        default: new Date()
    }
})

ReturnPeriodSchema.pre('save', function (callback) {
    this.date_created = new Date();
    this.date_modified = new Date();
    this.status = 'A';
    callback();
});

ReturnPeriodSchema.pre('findOneAndUpdate', function (callback) {
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('return_period_references', ReturnPeriodSchema)