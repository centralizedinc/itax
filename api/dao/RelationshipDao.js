const model = require('../models/UserModel');

class RelationshipDao {

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
}

module.exports = RelationshipDao