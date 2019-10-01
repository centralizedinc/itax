"use strict";

var mongoose = require("mongoose");

var SettingsSchema = new mongoose.Schema({
    code: {
        type: String
    },
    value: {
        type: String
    },
    status: {
        type: String
    },
    created_by: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    date_modified: {
        type: Date
    }
});

module.exports = mongoose.model("settings", SettingsSchema);