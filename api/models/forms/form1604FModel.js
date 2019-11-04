/**
 * 
 * @description FORM 1604F (JANUARY 2018)
 * @author Venus
 * @base_form https://home.kpmg/content/dam/kpmg/ph/pdf/InTAX/2019/1604-F%20Jan%202018%20Final%20Annex%20C.PDF
 * @version 1.0 - 11/04/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
var common_model = require('./commonModels');

const model_schema = {
    category_of_agent: {
        type: String
            /**
             * government
             * private
             */
    },
    // Part II Summary of Remittances - Schedule 1
    sched1: [{
        sched1_quarter: {
            type: String
        },
        sched1_date_remittance: {
            type: Date,
            default: new Date()
        },
        sched1_tra_number: {
            type: Number,
            default: 0
        },
        sched1_taxes_withheld: {
            type: Number,
            default: 0
        },
        sched1_penalties: {
            type: Number,
            default: 0
        },
        sched1_total_amount_remitted: {
            type: Number,
            default: 0
        },
        sched1_total_remittance: {
            type: Number,
            default: 0
        }
    }],
    //Schedule 2 Interest Payments
    sched2: [{
        sched2_quarter: {
            type: String
        },
        sched2_date_remittance: {
            type: Date,
            default: new Date()
        },
        sched2_tra_number: {
            type: Number,
            default: 0
        },
        sched2_taxes_withheld: {
            type: Number,
            default: 0
        },
        sched2_penalties: {
            type: Number,
            default: 0
        },
        sched2_total_amount_remitted: {
            type: Number,
            default: 0
        },
        sched2_total_remittance: {
            type: Number,
            default: 0
        }
    }],
    //Schedule 3 fringe benefits
    sched3: [{
        sched3_quarter: {
            type: String
        },
        sched3_date_remittance: {
            type: Date,
            default: new Date()
        },
        sched3_tra_number: {
            type: Number,
            default: 0
        },
        sched3_taxes_withheld: {
            type: Number,
            default: 0
        },
        sched3_penalties: {
            type: Number,
            default: 0
        },
        sched3_total_amount_remitted: {
            type: Number,
            default: 0
        },
        sched3_total_remittance: {
            type: Number,
            default: 0
        }
    }],
    // Part III Alphabetical List of Payees - Schedule 4
    sched4: [{
        sched4_seq_no: {
            type: Number
        },
        sched4_tin: {
            type: String
        },
        sched4_payees_name: {
            type: String
        },
        sched4_payees_address: {
            type: String
        },
        sched4_nationality_status: {
            type: String
        },
        sched4_atc_code: {
            type: String
        },
        sched4_income_payment: {
            type: Number,
            default: 0
        },
        sched4_tax_rate: {
            type: Number,
            default: 0
        },
        sched4_amount_tax_withheld: {
            type: Number,
            default: 0
        },
        sched4_total_withholding_tax: {
            type: Number,
            default: 0
        }
    }],
    // Schedule 5 Alphalist of employees
    sched5: [{
        sched5_seq_no: {
            type: Number
        },
        sched5_tin: {
            type: String
        },
        sched5_payees_name: {
            type: String
        },
        sched5_nature_benefits: {
            type: String
        },
        sched5_amount_fringe: {
            type: Number,
            default: 0
        },
        sched5_grossed_value: {
            type: Number,
            default: 0
        },
        sched5_amount_tax_withheld: {
            type: Number,
            default: 0
        },
        sched5_total_fringe_benefits: {
            type: Number,
            default: 0
        }
    }],
    // Schedule 6 Alphalist of other payees
    sched6: [{
        sched6_seq_no: {
            type: Number
        },
        sched6_tin: {
            type: String
        },
        sched6_payees_name: {
            type: String
        },
        sched6_payees_address: {
            type: String
        },
        sched6_nationality_status: {
            type: String
        },
        sched6_atc_code: {
            type: String
        },
        sched6_income_payment: {
            type: Number,
            default: 0
        },
        sched6_amount_tax_withheld: {
            type: Number,
            default: 0
        },
        sched6_total_withholding_tax: {
            type: Number,
            default: 0
        }
    }]
};

var Form1604FSchema = new Schema({
    ...common_model,
    ...model_schema
});

Form1604FSchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1604FSchema.pre('findOneAndUpdate', function(callback) {
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

const plugin = new autoIncrement(Form1604FSchema, '1604f_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1604f_forms', Form1604FSchema);