'use strict'

const connections = require('../dao/RelationshipDao')
const user = require('../dao/UserDao')
const model = require('../models/ActivityModel')

function file(tin, form) {
    return new Promise((resolve, reject) => {
        var activity = new model({
            created_by: { tin },
            subscribers: [tin],
            activity:'2',
            description:`Successfully filed ${form.form_type} Tax Return for ${form.tin}.\nReference Number: ${form.reference_no}`
        })
        user.findOne({ tin:tin })
            .then(result => {
                console.log('result ::: ' , JSON.stringify(result))
                activity.created_by.display_name = `${result.name.first} ${result.name.last}`;
                activity.created_by.avatar = result.avatar
                //find connections
                return connections.find({ from: tin })
            })
            .then(result => {
                result.forEach(element => {
                    activity.subscribers.push(element.to)
                });
                return activity.save()
            })
            .then(model => {
                resolve(model);
            })
            .catch(errors => {
                reject(errors)
            })
    });
}

function pay(tin) {

    var activity = new model({
        created_by: { tin }
    })
    user.findOne({ tin })
        .then(result => {
            activity.created_by.display_name = `${result.data.name.first} ${result.data.name.last}`;
            activity.avatar = result.data.avatar
        })
    //find connections
    connections.find({ from: tin })
        .then(model => {
            activity.
                return
        })
        .catch(errors => {

        })
}

module.exports = {
    file,
    pay
}