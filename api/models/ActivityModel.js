const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    reference_no:String,
    created_date: {
        type: Date,
        default: new Date()
    },
    created_by:{
        display_name: String,
        avatar: {},
        tin: String
    },
    /**
     * @description activity type
     *  0 - registration
     *  1 - connection
     *  2 - file tax returns
     *  3 - payments
     */
    activity:String,
    description:String,
    attachments:[
        {
            file_type:String,
            url: String
        }
    ],
    subscribers:[]
});


module.exports = mongoose.model('activities', schema)