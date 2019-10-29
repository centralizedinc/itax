'use strict'

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


    // Part II
    total_tax_withheld: { // item 14
        type: Number
    },
    prev_tax: { // item 15
        type: Number
    },
    other_remittances: [{ // item 16
        description: {
            type: String
        },
        amount: {
            type: Number
        }
    }],
    total_remittances: { // item 17
        type: Number
    },


    // Schedule 1
    sched1: [{
        description: { // item A
            type: String
        },
        atc_code: { // item B
            type: String
        },
        fringe_benefit: { // item C
            type: Number
        },
        percentage_divisor: { // item D
            type: Number
        },
        tax_base: { // item E
            type: Number
        },
        tax_rate: { // item F
            type: Number
        },
        tax_withheld: { // item G (E x F)
            type: Number
        }
    }],
    sched1_total_tax_withheld: { // sched 1 - item 3
        type: Number
    }
};

var Form1603QSchema = new Schema({ ...common_model, ...model_schema });

Form1603QSchema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1603QSchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1603QSchema, '1603q_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1603q_forms', Form1603QSchema);
