const model = require('../models/ReturnDetailsModel');

class ReturnDetailsDao {
    /**
     * @returns {Promise}
     */
    static findAll() {
        return model.find({}).lean().exec();
    }

    /**
     * @returns {Promise}
     * @param {String} account_id
     */
    static findByAccountId(account_id) {
        return model.find({ created_by: account_id }).lean().exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     */
    static find(conditions) {
        return model.find(conditions).lean().exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     */
    static findOne(conditions) {
        return model.findOne(conditions).lean().exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     * @param {Object} updated_details
     */
    static modifyOne(conditions, updated_details) {
        return model.findOneAndUpdate(conditions, updated_details).exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     * @param {Object} updated_details
     */
    static modify(conditions, updated_details) {
        return model.updateMany(conditions, updated_details).exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     * @param {Object} updated_details
     */
    static modifyById(id, updated_details) {
        return model.findByIdAndUpdate(id, updated_details).exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} form_details 
     */
    static create(form_details) {
        return (new model(form_details)).save();
    }
}

module.exports = ReturnDetailsDao