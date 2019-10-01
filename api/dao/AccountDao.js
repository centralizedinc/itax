const model = require('../models/AccountModel');
const bcrypt = require('bcrypt-nodejs')

class AccountDao {

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
    static findOneByAccountId(account_id) {
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
     * @param {String} email 
     */
    static findByEmail(email) {
        return model.findOne({
            email
        }).exec()
    }

    /**
     * @returns {Promise}
     * @param {String} facebook_id 
     */
    static findByFacebookID(facebook_id) {
        return model.findOne({
            facebook_id
        }).lean().exec()
    }

    /**
     * @returns {Promise}
     * @param {String} google_id 
     */
    static findByGoogleID(google_id) {
        return model.findOne({
            google_id
        }).lean().exec()
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
        return new Promise((resolve, reject) => {
            (new model(details)).save()
                .then((result) => {
                    const account_id = generateAccountId(result.auto_id);
                    return this.modifyById(result._id, { account_id })
                })
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                });
        })
    }

    /**
     * @returns {Promise}
     * @param {String} id 
     * @param {AccountModel} updated_account 
     */
    static modifyById(id, updated_account) {
        return model.findByIdAndUpdate(id, updated_account).exec()
    }

    /**
     * @returns {Promise}
     * @param {String} account_id 
     * @param {AccountModel} updated_account 
     */
    static modifyByAccountId(account_id, updated_account) {
        return model.findOneAndUpdate({ account_id }, updated_account).exec()
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     * @param {AccountModel} updated_account 
     */
    static modifyOne(conditions, updated_account) {
        return model.findOneAndUpdate(conditions, updated_account).exec()
    }
}

function generateAccountId(auto_id) {
    return new Date().getTime().toString() + auto_id.toString()
}

module.exports = AccountDao