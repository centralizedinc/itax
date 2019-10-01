'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rdoSchema = new Schema({
    code:String,
    description: String,
    status:String,
});


module.exports = mongoose.model('rdo', rdoSchema);