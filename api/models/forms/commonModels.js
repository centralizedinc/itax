const model = {
    auto_id: {
        type: Number
    },
    reference_no: {
        type: String
    },
    taxpayer: {},
    spouse_details: {},
    due_date: {
        type: Date
    },
    return_period: {
        type: Date
    },
    return_period_month: {
        type: String
    },
    return_period_year: {
        type: String
    },
    accounting_type: {
        type: String
        /**
         * c - calendar
         * f - fiscal
         */
    },
    quarter: {
        type: Number,
        default: 0
            /**
             * 0, 1, 2
             */
    },
    amended_yn: {
        type: Boolean,
        default: false
    },
    num_of_sheet: {
        type: Number,
        default: 0
    },
    is_avail_tax_relief: {
        type: Boolean,
        default: false
    },
    avail_tax_relief: {
        type: String
    },
    tax_due: {
        type: Number,
        default: 0
    },
    surcharge: {
        type: Number,
        default: 0
    },
    interest: {
        type: Number,
        default: 0
    },
    compromise: {
        type: Number,
        default: 0
    },
    penalties: {
        type: Number,
        default: 0
    },
    total_amount_payable: {
        type: Number,
        default: 0
    },
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