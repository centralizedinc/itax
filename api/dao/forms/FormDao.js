
class FormDao {
    /**
     * Initialize the model
     */
    constructor(form_type) {
        try {
            this.model = require(`../../models/forms/form${form_type.toUpperCase()}Model`);
        } catch (err) {
            this.model = null;
            console.log('Invalid form_type in FormDao.');
        }
    }

    /**
     * @returns {Promise}
     */
    findAll() {
        if(!this.model) return Promise.reject({ message: 'Invalid constructor' })
        return this.model.find({}).lean().exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     */
    find(conditions) {
        if(!this.model) return Promise.reject({ message: 'Invalid constructor' })
        return this.model.find(conditions).lean().exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     */
    findOne(conditions) {
        if(!this.model) return Promise.reject({ message: 'Invalid constructor' })
        return this.model.findOne(conditions).lean().exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     * @param {Object} updated_details
     */
    modifyOne(conditions, updated_details) {
        if(!this.model) return Promise.reject({ message: 'Invalid constructor' })
        return this.model.findOneAndUpdate(conditions, updated_details).exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     * @param {Object} updated_details
     */
    modifyById(id, updated_details) {
        if(!this.model) return Promise.reject({ message: 'Invalid constructor' })
        return this.model.findByIdAndUpdate(id, updated_details).exec();
    }

    /**
     * @returns {Promise}
     * @param {Object} form_details 
     */
    create(form_details) {
        if(!this.model) return Promise.reject({ message: 'Invalid constructor' })
        return new Promise((resolve, reject) => {
            (new this.model(form_details)).save()
                .then((result) => {
                    console.log('result model :', result);
                    const reference_no = generateReferenceNo(result.auto_id);
                    return this.modifyById(result._id, { reference_no })
                })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    console.log('error dao :', err);
                    reject(err)
                });
        })
    }
}

function generateReferenceNo(auto_id) {
    return new Date().getTime().toString() + auto_id.toString()
}

module.exports = FormDao