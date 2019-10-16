const model = require('../../models/forms/form1601CModel');

class ReturnPeriodDao {
    /**
     * @returns {Promise}
     */
    static findAll() {
        return model.find({}).lean().exec();
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
    static modifyById(id, updated_details) {
        return model.findByIdAndUpdate(id, updated_details).exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} data 
     */
    static create(data) {
        return (new model(form_details)).save();
    }
}

module.exports = ReturnPeriodDao