/**
 * 
 * @description FORM 1702Q (July 2008)
 * @author Mark
 * @base_form https://www.bir.gov.ph/images/bir_files/old_files/pdf/267751702Qjuly2008.pdf
 * @version 1.0 - 10/30/2019
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    method_deduction: { // item 13
        type: String
        /**
         * ID, OSD
         */
    },
    atc_code: { // item 15
        type: String
    },


    // Part II
    exempt: {
        sales_fees: { // item 16A
            type: Number
        },
        less_cost_sale: { // item 17A
            type: Number
        },
        gross_income_operation: { // item 18A
            type: Number
        },
        total_gross_income: { // item 20A
            type: Number
        },
        less_deductions: { // item 21A
            type: Number
        }
    },
    special_rate: {
        sales_fees: { // item 16B
            type: Number
        },
        less_cost_sale: { // item 17B
            type: Number
        },
        gross_income_operation: { // item 18B
            type: Number
        },
        other_non_operating: { // item 19A
            type: Number
        },
        total_gross_income: { // item 20B
            type: Number
        },
        less_deductions: { // item 21B
            type: Number
        },
        quarter_taxable_income: { // item 22A
            type: Number
        },
        prev_quarter_taxable_income: { // item 23A
            type: Number
        },
        total_taxable_income: { // item 24A
            type: Number
        },
        tax_rate: { // item 25A
            type: Number
        },
        income_tax: { // item 26A
            type: Number
        },
        other_agencies_share: { // item 27
            type: Number
        }
    },
    regular_rate: {
        sales_fees: { // item 16C
            type: Number
        },
        less_cost_sale: { // item 17C
            type: Number
        },
        gross_income_operation: { // item 18C
            type: Number
        },
        other_non_operating: { // item 19B
            type: Number
        },
        total_gross_income: { // item 20C
            type: Number
        },
        less_deductions: { // item 21C
            type: Number
        },
        quarter_taxable_income: { // item 22B
            type: Number
        },
        prev_quarter_taxable_income: { // item 23B
            type: Number
        },
        total_taxable_income: { // item 24B
            type: Number
        },
        tax_rate: { // item 25B
            type: Number
        },
        income_tax: { // item 26B
            type: Number
        }
    },
    min_corporate_income_tax: { // item 28
        type: Number
    },
    regular_rate_tax: { // item 29A
        type: Number
    },
    less_unexpired_excess: { // item 29B
        type: Number
    },
    balance: { // item 29C
        type: Number
    },
    special_rate_tax_due: { // item 29D
        type: Number
    },
    aggregate_income_tax_due: { // item 30
        type: Number
    },
    prior_excess_credits: { // item 31A
        type: Number
    },
    prev_quarter_tax_payment: { // item 31B
        type: Number
    },
    prev_quarter_mcit_payment: { // item 31C
        type: Number
    },
    prev_quarter_creditable_tax: { // item 31D
        type: Number
    },
    quarter_creditable_tax: { // item 31E
        type: Number
    },
    prev_tax_paid: { // item 31F
        type: Number
    },
    other_tax_credits_desc: { // item 31G
        type: String
    },
    other_tax_credits_amount: { // item 31G
        type: Number
    },
    total_tax_credits: { // item 31H
        type: Number
    },
    /**
     * tax_due for item 32
     * surcharge for item 33A
     * interest for item 33B
     * compromise for item 33C
     * penalties for item 33D
     * total_amount_payable for item 34
     */

    sched1: {
        quarter1_total_gross: { // 1st Quarter
            type: Number
        },
        quarter2_total_gross: { // 2nd Quarter
            type: Number
        },
        quarter3_total_gross: { // 3rd Quarter
            type: Number
        },
        total_gross: { // Total
            type: Number
        },
        tax_rate: { // Tax Rate
            type: Number
        }
    }
};

var Form1702QSchema = new Schema({ ...common_model, ...model_schema });

Form1702QSchema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1702QSchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form1702QSchema, '1702q_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
    // Plugin failed to initialise
    console.log("############### init failed: " + e);
});


module.exports = mongoose.model('1702q_forms', Form1702QSchema);