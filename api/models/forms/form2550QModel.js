'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    year_type: {
        type: Date
    },
    year_ended_month: {
        type: Date
    },
    year_ended_year: {
        type: Date
    },
    quarter: {
        type: Number,
        default: 0
            /**
             * 0, 1, 2
             */
    },
    short_period_return: {
        type: Boolean
    },
    line_of_business: { 
        type: String
    },
    exclusive_of_vat:[{
        vatabale_sales:{
            type: Number,
            default: 0
        }, // item15A / Sched. 1
        sale_to_government:{
            type: Number,
            default: 0
        }, //item16A
        zero_rated_sales:{
            type: Number,
            default: 0
        }, //item17
        exempt_sales:{
            type: Number,
            default: 0
        }, //item18
        total_tax_due:{
            type: Number,
            default: 0
        }, //item19A
    }],
    output_tax_due:[{
        vatabale_sales:{
            type: Number,
            default: 0
        }, // item15B
        sale_to_government:{
            type: Number,
            default: 0
        }, //item16B
        total_tax_due:{
            type: Number,
            default: 0
        }, //item19B
    }]
    }],
};

var Form2550qSchema = new Schema({...common_model, ...model_schema });

Form2550qSchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form2550qSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form2550qSchema, '2550q_forms', options);
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


module.exports = mongoose.model('2550q_forms', Form2550qSchema);