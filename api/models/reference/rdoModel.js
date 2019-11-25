'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rdoSchema = new Schema({
    code:String,
    description: String,
    coordinates: {
        lat:{
            type: Number
        },
        lng: {
            type: Number
        },
        radius: {
            type: Number
        }
    },
    target_collections: {
        type: Number
    },
    status:{
        type:String,
        default: "A"
    },
    date_created: {
        type: Date,
        default: new Date()
    }
});


module.exports = mongoose.model('rdo', rdoSchema);