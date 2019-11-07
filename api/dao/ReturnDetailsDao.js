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

    //ADMIN 

    /**
     * @returns {Promise}
     * @param {String} conditions
     */
    static getCollection(conditions) {
        return model.find({ "payment_status": 'paid' }).select('date_created rdo_code payment_status total_amount_payable').lean().exec();
    }

    /** 
     * @returns {Promise}
     * @param {String} conditions
     */
    static findReturns(conditions) {
        return model.find({ conditions }).lean().exec();
    }

    /**
     * @returns {Promise}
     * @param {String} conditions
     */
    static countCollected(conditions) {
        return model.find({ "payment_status": 'paid' }).count().exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions
     * @param {String} fields 
     */
    static findByFields(conditions, fields) {
        return model.find(conditions).select(fields).lean().exec();
    }

    /**
    * @returns {Promise}
    */
    static getCollectionByMonth(year) {
        var gteDate = new Date(), ltDate = new Date();
        console.log('year :', year);
        gteDate.setMonth(0);
        gteDate.setDate(1);
        gteDate.setFullYear(year);
        ltDate.setMonth(11);
        ltDate.setDate(31);
        ltDate.setFullYear(year);
        console.log('gteDate :', gteDate);
        console.log('ltDate :', ltDate);
        return model.find({ "payment_status": 'paid', "date_created": { $gte: gteDate, $lt: ltDate } }).select('date_created rdo_code payment_status total_amount_payable').lean().exec();
    }

    static createMany(data){
        return model.insertMany(data)
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions
     * @param {String} fields 
     */
    static getCollectionByYear(year) {
        var gteDate = new Date(), ltDate = new Date();
        var code = "";
        console.log('year :', year);
        gteDate.setMonth(0);
        gteDate.setDate(1);
        gteDate.setFullYear(year);
        ltDate.setMonth(11);
        ltDate.setDate(31);
        ltDate.setFullYear(year);
        return model.find({ "payment_status": 'paid', "date_created": { $gte: gteDate, $lt: ltDate }, rdo_code: code }).select('date_created rdo_code payment_status total_amount_payable').lean().exec();
    }

    /**
     * @returns {Promise}
     */
    static getCollectionByRdo(code) {
        return model.find({ "payment_status": 'paid', "rdo_code": code, "date_created": new Date }).select('date_created rdo_code payment_status total_amount_payable').lean().exec()
    }
    /**
     * @returns {Promise}
     * @param {Object} conditions
     * @param {String} fields 
     */
    static getCountOfTaxpayer(conditions, fields) {
        return model.find(conditions).select(fields).count().exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions
     * @param {String} fields 
     */
    static getCountOfReturns(conditions, fields) {
        return model.find(conditions).select(fields).count().exec();
    }

}

module.exports = ReturnDetailsDao