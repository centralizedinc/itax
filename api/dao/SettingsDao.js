"use strict";

var model = require('../models/SettingsModel');

class SettingsDao {
    /**
     * @returns {Promise}
     */
    static getSettings() {
        return model.find({}).lean().exec()
    }

    /**
     * @returns {Promise}
     */
    static getActiveSettings() {
        return model.find({
            "status": 'A'
        }).lean().exec()
    }

    /**
     * @returns {Promise}
     */
    static getInActiveSettings() {
        return model.find({
            "status": 'I'
        }).lean().exec()
    }

    static addSettings(details) {
        return (new model(details)).save()
    }
}

module.exports = SettingsDao;