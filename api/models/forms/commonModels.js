const model = {
    auto_id: { // use for the sequence of reference no
        type: Number
    },
    reference_no: { // use as reference in every filed form
        type: String
    },
    tax_type: { // Taxtype of form
        type: String
    },
    taxpayer: {}, // taxpayer details as of filed date, fields can be found at ../taxpayerDetailsModel.js
    spouse_details: {}, // details of taxpayer's spouse as of filed date, fields can be found at ../taxpayerDetailsModel.js
    seller_details: {}, // details of taxpayer's seller as of filed date, fields can be found at ../taxpayerDetailsModel.js
    buyer_details: {}, // details of taxpayer's buyer as of filed date, fields can be found at ../taxpayerDetailsModel.js
    employer_details: {}, // details taxpayer's employer as of filed date, fields can be found at ../taxpayerDetailsModel.js
    spouse_employer_details: {}, // details of spouse's employer as of filed date, fields can be found at ../taxpayerDetailsModel.js
    due_date: { // use to compute penalties if late filing
        type: Date
    },
    return_period: { // use to compute due date
        type: Date
    },
    return_period_month: { // month of return period, must be use only in Monthly Forms
        type: String
    },
    return_period_year: { // year of return period, must be use in Monthly, Quarterly and Annual Forms
        type: String
    },
    quarter: { // quarter for return period, must be use only in Quarterly Forms
        type: Number,
        default: 1 // set default as First Quarter
            /**
             * 1, 2, 3, 4
             */
    },
    amended_yn: { // if the form is amended
        type: Boolean,
        default: false
    },
    short_period: { // if the form is short period
        type: Boolean,
        default: false
    },
    num_of_sheet: { // Number of sheet
        type: Number,
        default: 0
    },
    any_taxes_withheld: { // Any Taxes Withheld?
        type: Boolean
    },
    is_avail_tax_relief: { // If availing of tax relief under Spe ial Law or International Tax Treaty?
        type: Boolean,
        default: false
    },
    avail_tax_relief: { // if yes, specify
        type: String
    },
    tax_due: { // use to compute penalties
        type: Number,
        default: 0
    },
    surcharge: { // surcharge penalty
        type: Number,
        default: 0
    },
    interest: { // interest penalty
        type: Number,
        default: 0
    },
    compromise: { // compromise penalty
        type: Number,
        default: 0
    },
    penalties: { // total penalties (surcharge + interest + compromise)
        type: Number,
        default: 0
    },
    total_amount_payable: { // total amount payable (tax_due + penalties)
        type: Number,
        default: 0
    },
    over_remittance: [],
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
}
module.exports = model;