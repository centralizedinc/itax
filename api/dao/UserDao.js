const model = require('../models/UserModel');

class UserDao {
    /**
     * @returns {Promise}
     */
    static findAll() {
        return model.find({}).lean().exec()
    }

    /**
     * @returns {Promise}
     * @param {String} id 
     */
    static findOneByID(id) {
        return model.findById(id).lean().exec()
    }

    /**
     * @returns {Promise}
     * @param {String} account_id 
     */
    static findOneByAccountID(account_id) {
        return model.findOne({ account_id }).lean().exec()
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     */
    static findOne(conditions) {
        return model.findOne(conditions).lean().exec()
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     */
    static find(conditions) {
        return model.find(conditions).lean().exec()
    }

    /**
     * @returns {Promise}
     * @param {Object} details 
     */
    static create(details) {
        return (new model(details)).save()
    }

    /**
     * @returns {Promise}
     * @param {String} id
     * @param {Object} details 
     */
    static modifyByID(id, details) {
        return model.findByIdAndUpdate(id, details).exec();
    }


    /**
     * @returns {Promise}
     * @param {String} account_id 
     * @param {Object} details 
     */
    static modifyByAccountID(account_id, details) {
        return model.findOneAndUpdate({ account_id }, details).exec();
    }
}

module.exports = UserDao