'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormTypeSchema = new Schema({
    formType: String,
    formTypeCode: String,
    taxCode: String,
    formName: String,
    status: String,
    version: String
});


module.exports = mongoose.model('form_type', FormTypeSchema);