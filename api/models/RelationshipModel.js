const mongoose = require('mongoose')

const RelationshipModelSchema = new mongoose.Schema({
    relationship: {
        type: Number
        /**
         * Employer - 0
         * Spouse - 1
         */
    },
    from: {
        type: String
    },
    to: {
        type: String
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

RelationshipModelSchema.pre('save', function (callback) {
    this.date_created = new Date();
    this.date_modified = new Date();
    this.status = 'A';
    callback();
});

RelationshipModelSchema.pre('findOneAndUpdate', function (callback) {
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('relationships', RelationshipModelSchema)