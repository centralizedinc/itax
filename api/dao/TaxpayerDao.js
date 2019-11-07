const model = require('../models/taxpayerDetailsModel');

class TaxpayerDao {
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
     * @param {Array<Object>} details 
     * @param {String} created_by
     */
    static createMany(details, created_by) {
        var data = details.map(v => {
            v.created_by = created_by;
            return v;
        })
        return model.insertMany(data);
    }

    /**
     * @returns {Promise}
     * @param {String} tin 
     */
    static findOneByTIN(tin) {
        return model.findOne({ tin }).lean().exec();
    }

    /**
     * @returns {Promise}
     * @param {String} tin 
     */
    static searchByTIN(tin) {
        return model.find({ tin: { $regex: `^${tin}`, $options: 'mi' } }).select('_id tin branch_code individual_details').lean().exec();
    }

    /**
     * @returns {Promise}
     * @param {String} id 
     * @param {Object} data 
     */
    static modifyByID(id, data) {
        return model.findByIdAndUpdate(id, data).exec();
    }

    /**
     * @returns {Promise}
     * @param {Array} tins 
     */
    static findConnected(tins) {
        return model.find({
            tin: {
                $in: tins
            }
        }).lean().exec()
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     */
    static getCountsByConditions(conditions){
        return model.count(conditions).exec();
    }
}

module.exports = TaxpayerDao;