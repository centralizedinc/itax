const model = require('../../models/forms/form1601CModel');

class Form1601CDao {
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
     * @param {Object} form_details 
     */
    static create(form_details) {
        return new Promise((resolve, reject) => {
            (new model(form_details)).save()
                .then((result) => {
                    const reference_no = generateReferenceNo(result.auto_id);
                    return this.modifyById(result._id, { reference_no })
                })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err)
                });
        })
    }
}

function generateReferenceNo(auto_id) {
    return new Date().getTime().toString() + auto_id.toString()
}

module.exports = Form1601CDao