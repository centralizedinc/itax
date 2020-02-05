const model = require('../models/paymentDetailModel');

class PaymentDao {
    /**
     * @returns {Promise}
     */
    static findAll() {
        return model.find({}).lean().exec()
    }

    static findAllByID(id) {
        return model.find({created_by:id}).lean().exec()
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
     * @param {String} reference_no 
     */
    static findOneByReferenceNo(reference_no) {
        return model.findOne({ references: reference_no }).lean().exec()
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
        // details.payment_conf_no = new Date().getTime();
        return (new model(details)).save()
    }

    /**
     * @returns {Promise}
     * @param {Object} details 
     */
    static createMany(details) {
        return model.insertMany(details);
    }
    
}

module.exports = PaymentDao