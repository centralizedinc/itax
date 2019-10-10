'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

var Form2550MSchema = new Schema({
    reference_no: String,
    taxpayer: {},
    dateFiled: {
        type: Date,
        default: new Date()
    },
    dueDate: Date,
    returnPeriod: Date,
    returnPeriodMonth: String,
    returnPeriodYear: String,
    amendedYn: Boolean,
    numOfSheet: { type: Number, default: 0 },
    is_avail_tax_relief: String,
    avail_tax_relief: String,
    totalAtcAmount: { type: Number, default: 0 }, //item 12A
    totalAtcOutput: { type: Number, default: 0 }, // item 12B
    salesGovAmount: { type: Number, default: 0 },
    salesGovOutput: { type: Number, default: 0 },
    zeroRatedAmount: { type: Number, default: 0 },
    exemptAmount: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    totalOutputTax: { type: Number, default: 0 },
    carriedOverPreviousPeriod: { type: Number, default: 0 },
    txbleGoodsServices: { type: Number, default: 0 },
    transInputTax: { type: Number, default: 0 },
    presumpInputTax: { type: Number, default: 0 },
    otherAllowableLessInputTax: { type: Number, default: 0 },
    totalAllowableLessInputTax: { type: Number, default: 0 },
    purCapGoodsNotExceed: { type: Number, default: 0 },
    outputCapGoodsNotExceed: { type: Number, default: 0 },
    purCapGoodsExceed: { type: Number, default: 0 },
    outputPurCapGoodsExceed: { type: Number, default: 0 },
    domesticPurchaseGoods: { type: Number, default: 0 },
    outputDomesticPurchaseGoods: { type: Number, default: 0 },
    importationGoods: { type: Number, default: 0 },
    outputImportationGoods: { type: Number, default: 0 },
    domesticPurchaseService: { type: Number, default: 0 },
    outputDomesticPurchaseService: { type: Number, default: 0 },
    servicesNonResidents: { type: Number, default: 0 },
    outputServicesNonResidents: { type: Number, default: 0 },
    purchaseNotQualified: { type: Number, default: 0 },
    outputPurchaseNotQualified: { type: Number, default: 0 },
    purchaseOthers: { type: Number, default: 0 },
    outputPurchaseOthers: { type: Number, default: 0 },
    totalCurrentPurchases: { type: Number, default: 0 },
    totalAvailableInputTax: { type: Number, default: 0 },
    inputTaxPurchaseCapGoods: { type: Number, default: 0 },
    inputTaxSaleToGovt: { type: Number, default: 0 },
    inputTaxAllocableToExempt: { type: Number, default: 0 },
    refundTcm: { type: Number, default: 0 },
    otherDeductionFrInputTax: { type: Number, default: 0 },
    totalDeductionFrInputTax: { type: Number, default: 0 },
    totalInputTax: { type: Number, default: 0 },
    taxDue: { type: Number, default: 0 },
    creditableVatWithheld: { type: Number, default: 0 },
    advPaySugarFlourInd: { type: Number, default: 0 },
    taxWthld: { type: Number, default: 0 },
    prevTaxPaid: { type: Number, default: 0 },
    advPymt: { type: Number, default: 0 },
    otherTaxCredits: { type: Number, default: 0 },
    totalCredits: { type: Number, default: 0 },
    amtPaybl: { type: Number, default: 0 },
    surcharge: { type: Number, default: 0 },
    interest: { type: Number, default: 0 },
    compromise: { type: Number, default: 0 },
    penalties: { type: Number, default: 0 },
    totalAmountPayable: { type: Number, default: 0 },
    batchNo: { type: Number, default: 0 },
    sched1: [{
        atc: {
            type: String
        },
        amount: {
            type: Number,
            default: 0
        },
        output_tax: {
            type: Number,
            default: 0
        }
    }],
    sched2: [],
    sched3: [],
    sched4: {
        dirInputTax:{
            type: Number
        },
        inputNotAttrib:{
            type: Number
        },
        ratInputTax:{
            type: Number
        },
        totalInputTax:{
            type: Number
        },
        stanInputTax:{
            type: Number
        },
        inputSaleExp:{
            type: Number
        }
    },
    sched5: {
        // inputTaxExmpt:Number,
        // inputNotAttrib: Number,
        // ratInputTax: Number,
        // totalInputExmpt: Number
    },
    sched6: [],
    sched7: [],
    sched8: [],
    date_created: {
        type: Date,
        default: new Date()
    },
    date_modified: {
        type: Date,
        default: new Date()
    },
    auto_id: {
        type: Number
    },
    created_by: {
            type: String
    },
    modified_by: {
            type: String
    }
});

Form2550MSchema.pre('save', function (callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form2550MSchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(Form2550MSchema, '2550m_forms', options);
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


module.exports = mongoose.model('2550m_forms', Form2550MSchema);
