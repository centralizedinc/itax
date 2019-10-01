'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ATCSchema = new Schema({
    form: String,
    code: String,
    description: String,
    taxCode: String,
    rate: Number,
    status: String,
    version: String
});


module.exports = mongoose.model('atc', ATCSchema);