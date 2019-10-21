'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const common_model = require('./commonModels');

const model_schema = {
    
};

var Form1702EXSchema = new Schema({...common_model, ...model_schema });

Form1702EXSchema.pre('save', function(callback) {
    var form = this;
    form.date_created = new Date();
    form.date_modified = new Date();
    callback();
});

Form1702EXSchema.pre('findOneAndUpdate', function(callback) {
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});


const options = {
    field: 'auto_id', // auto_id will have an auto-incrementing value
    incrementBy: 1, // incremented by 2 every time
    nextCount: false, // Not interested in getting the next count - don't add it to the model
    // resetCount: 'reset', // The model and each document can now reset the counter via the reset() method
    startAt: 0, // Start the counter at 1000
    unique: false // Don't add a unique index
};

const plugin = new autoIncrement(Form1702EXSchema, '1702ex_forms', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin().catch(e => {
        // Plugin failed to initialise
        console.log("############### init failed: " + e);
    });


module.exports = mongoose.model('1702ex_forms', Form1702EXSchema);