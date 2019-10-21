'use strict'

const connections = require('../dao/RelationshipDao')
const user = require('../dao/UserDao')
const model = require('../models/ActivityModel')

function file(tin, form) {
    return new Promise((resolve, reject) => {
        var activity = new model({
            reference_no: form.reference_no,
            created_by: { tin },
            subscribers: [tin],
            activity: '2',
            description: `Successfully filed ${form.form_type} Tax Return for ${form.tin}.\nReference Number: ${form.reference_no}`
        })
        user.findOne({ tin: tin })
            .then(result => {
                console.log('result ::: ', JSON.stringify(result))
                if (result) {
                    activity.created_by.display_name = result.name ? `${result.name.first} ${result.name.last}` : '';
                    activity.created_by.avatar = result.avatar
                }
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

function pay(tin, data) {

    return new Promise((resolve, reject) => {
    console.log('saving payment activity ....')
    var activity = new model({
        reference_no: data.payments.payment_conf_no,
        created_by: { tin },
        subscribers: [tin],
        activity: '3',
        description: `Successfully paid the amount of ${data.payments.amount_paid} as payment for ${data.return_details.form_type} Tax Return.\n Payment Confirmation Number: ${data.payments.payment_conf_no}`
    })

    user.findOne({ tin: tin })
        .then(result => {
            console.log('result ::: ', JSON.stringify(result))
            if (result) {
                activity.created_by.display_name = result.name ? `${result.name.first} ${result.name.last}` : '';
                activity.created_by.avatar = result.avatar
            }
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
            console.log('PAYMENT ERRORS:::', errors)
            reject(errors)
        })
    })
}

module.exports = {
    file,
    pay
}