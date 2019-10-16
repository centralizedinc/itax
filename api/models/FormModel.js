const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    
    url: String,
    reference_no: String,
    form: String,
    created_by: String,
    created_date:{
        type: Date,
        default: new Date()
    }

})

module.exports = mongoose.model('form_copies', schema)