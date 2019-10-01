const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs');
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

const AccountModelSchema = new mongoose.Schema({
    account_id: {
        type: String
    },
    auto_id: {
        type: Number
    },
    email: {
        type: String
    },
    method: {
        type: String,
        default: 'local'
    },
    password: {
        type: String,
    },
    status: {
        type: Number,
        default: 0
        /**
         * 0 - registered
         * 1 - setup
         * 2 - confirmed 
         */
    },
    confirmation_url: {
        type: String
    },
    google_id: {
        type: String
    },
    google_access_token: {
        type: String
    },
    facebook_id: {
        type: String
    },
    facebook_access_token: {
        type: String
    },
    session_token: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    date_modified: {
        type: Date,
        default: new Date()
    }
})

AccountModelSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();

    if (account.password) {
        const salt = bcrypt.genSaltSync(5);
        const hash = bcrypt.hashSync(account.password, salt)
        account.password = hash;
    }
    callback();
});

AccountModelSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

AccountModelSchema.methods.isValidPassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isValid) => {
            if (!err) resolve(isValid)
            else reject(err)
        });
    })
}

const options = {
    field: 'auto_id', // auto_id will have an auto-incrementing value
    incrementBy: 1, // incremented by 2 every time
    nextCount: false, // Not interested in getting the next count - don't add it to the model
    // resetCount: 'reset', // The model and each document can now reset the counter via the reset() method
    startAt: 0, // Start the counter at 1000
    unique: false // Don't add a unique index
};

const plugin = new autoIncrement(AccountModelSchema, 'accounts', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin()
    .then(() => {
        console.log("############### init plugin")
    })
    .catch(e => {
        // Plugin failed to initialise
        console.log("############### init failed: " + e);
    });

module.exports = mongoose.model('accounts', AccountModelSchema)