const model = require('../models/reference/rdoModel');

class RdoDao {
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
     * @param {String} reference_no 
     */
    static findByRdoCode(code) {
        return model.findAll({ code: code }).lean().exec()
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

module.exports = RdoDao