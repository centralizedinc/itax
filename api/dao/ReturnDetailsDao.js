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

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     */
    static getCountsByConditions(conditions) {
        return model.countDocuments(conditions);
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     * @param {String} select
     */
    static selectByConditions(conditions, select) {
        return model.find(conditions).select(select).exec();
    }

    //ADMIN 

    /**
     * @returns {Promise}
     * @param {Object} rdo_code 
     */
    static getCollection(rdo_code) {
        var conditions = { "payment_status": 'paid' };
        if (rdo_code) conditions.rdo_code = rdo_code;
        return model.find(conditions).select('date_created rdo_code payment_status total_amount_payable').lean().exec();
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
        return model.countDocuments({ "payment_status": 'paid' });
    }

    /**
 * @returns {Promise}
 * @param {String} rdo_code
 */
    static countReturns(rdo_code) {
        var conditions = {};
        if (rdo_code) conditions.rdo_code = rdo_code;
        return model.find(conditions).exec();
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
   * @param {String} rdo_code
   */
    static getCollectionOfRdoByMonth(year, rdo_code) {
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
        return model.find({ "payment_status": 'paid', "date_created": { $gte: gteDate, $lt: ltDate }, rdo_code: rdo_code, }).select('date_created rdo_code payment_status total_amount_payable').lean().exec();
    }


    /**
     * @returns {Promise}
     * @param {String} rdo_code
     */
    static getCollectionByRdo(rdo_code) {
        console.log('rdo_code :', rdo_code);
        return model.find({ rdo_code: rdo_code, "payment_status": 'paid' }).select('date_created rdo_code payment_status total_amount_payable').lean().exec();
    }

    static createMany(data) {
        return model.insertMany(data)
    }

    /**
     * @returns {Promise}
     * @param {Date} year 
     */
    static getRdoCollectionByYear(year) {
        var gteDate = new Date(year, 0, 1), ltDate = new Date(year, 12, 0);
        console.log('year :', year);
        return model.find({ "date_created": { $gte: gteDate, $lt: ltDate }, "payment_status": 'paid' }).select('rdo_code total_amount_payable').lean().exec();
    }

    /**
    * @returns {Promise}
    * @param {Date} year 
    */
    static getCollectionByMonth(year, rdo_code) {
        var conditions = { "payment_status": "paid", "date_created": { $gte: new Date(year, 0, 1), $lt: new Date(year, 12, 0) } }
        if(rdo_code) conditions.rdo_code = rdo_code;
        return model.find(conditions).select('date_created rdo_code payment_status total_amount_payable').lean().exec();
    }

    /**
    * @returns {Promise}
    * @param {Date} year 
    */
    static getReturnsByMonth(year, rdo_code) {
        var conditions = { "date_created": { $gte: new Date(year, 0, 1), $lt: new Date(year, 12, 0) } }
        if(rdo_code) conditions.rdo_code = rdo_code;
        return model.find(conditions).select('date_created rdo_code payment_status total_amount_payable').lean().exec();
    }

    /**
      * @returns {Promise}
      * @param {Date} year 
      */
    static getCollectionByMonthPaid(year) {
        var gteDate = new Date(year, 0, 1), ltDate = new Date(year, 12, 0);
        console.log('year :', year);
        return model.find({ "payment_status": 'paid', "date_created": { $gte: gteDate, $lt: ltDate } }).select('date_created rdo_code payment_status total_amount_payable').lean().exec();
    }

    /**
    //  * @returns {Promise}
     */
    // static getCollectionByRdo(code) {
    // return model.find({ "rdo_code": code, "payment_status": 'paid', "date_created": new Date }).select('date_created rdo_code payment_status total_amount_payable').lean().exec()
    // }

    /**
     * @returns {Promise}
     * @param {Object} conditions
     * @param {String} fields 
     */
    static getCountOfTaxpayer(conditions, fields) {
        // return model.find(conditions).select(fields).count().exec();
        return model.countDocuments(conditions);
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions
     * @param {String} fields 
     */
    static getCountOfReturns(conditions, fields) {
        // return model.find(conditions).select(fields).count().exec();
        return model.countDocuments(conditions);
    }

}

module.exports = ReturnDetailsDao