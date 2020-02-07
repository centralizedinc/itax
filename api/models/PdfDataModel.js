const mongoose = require('mongoose')

const PdfDataSchema = new mongoose.Schema({
    name: {
        type: String
        // Name of pdf js file
    },
    code: {
        type: String
        // keyword or code
    },
    page: {
        type: Number
    },
    background_image: {
        type: String
        // URL background image of pdf
    },
    datas: [{
        x: {
            type: Number
            // row no
        },
        y: {
            type: Number
            // col no
        },
        text: {
            type: String
            // text 
        },
        key: {
            type: String
            // to be used in mapping value
        },
        options: {}
        // other configs || options of value
    }],
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

PdfDataSchema.pre('save', function (callback) {
    this.date_created = new Date();
    this.date_modified = new Date();
    this.status = 'A';
    callback();
});

PdfDataSchema.pre('findOneAndUpdate', function (callback) {
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('pdf_datas', PdfDataSchema)