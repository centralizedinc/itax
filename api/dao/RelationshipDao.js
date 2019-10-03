const model = require('../models/UserModel');

class RelationshipDao {

    /**
     * @returns {Promise}
     */
    static findAll() {
        return model.find({
            status: 'A'
        }).lean().exec()
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
     * @param {Object} data `from, to, modified_by `
     */
    static remove(data) {
        const { from, to, modified_by } = data;
        return new Promise((resolve, reject) => {
            var result = {};
            this.modify({ from, to }, { status: 'I', modified_by })
                .then((data) => {
                    result = data;
                    return this.modify({ from: to, to: from }, { status: 'I', modified_by })
                })
                .then((data) => {
                    resolve(result);
                })
                .catch((err) => reject(err));
        })
    }

    /**
     * @returns {Promise}
     * @param {Object} details 
     */
    static create(details) {
        return new Promise((resolve, reject) => {
            var data = {};
            (new model(details)).save()
                .then((result) => {
                    data = result;
                    const reversed_data = {
                        relationship: result.relationship,
                        from: result.to,
                        to: result.from,
                        created_by: result.created_by
                    }
                    return (new model(reversed_data)).save();
                })
                .then((reversed_result) => {
                    resolve(data)
                })
                .catch((err) => reject(err));
        })
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     */
    static modify(conditions, updated_details) {
        return model.findOneAndUpdate(conditions, updated_details).exec()
    }
}

module.exports = RelationshipDao