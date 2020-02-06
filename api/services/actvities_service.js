'use strict'

const connections = require('../dao/RelationshipDao')
const user = require('../dao/UserDao')
const model = require('../models/ActivityModel')

function file(tin, form, account_id) {
    return new Promise((resolve, reject) => {
        var activity = new model({
            reference_no: form.reference_no,
            created_by: { tin, account_id },
            subscribers: [tin],
            activity: '2',
            description: `Successfully filed ${form.form_type} Tax Return for ${formatTIN(form.tin)}.\nReference Number: ${form.reference_no}`
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

function pay(tin, data , account_id) {

    return new Promise((resolve, reject) => {
    console.log('saving payment activity ....')
    var activity = new model({
        reference_no: data.payments.payment_conf_no,
        created_by: { tin, account_id },
        subscribers: [tin],
        activity: '3',
        description: `Successfully paid the amount of ${formatAmount(data.payments.amount_paid)} as payment for ${data.return_details.form_type} Tax Return.\n Payment Confirmation Number: ${data.payments.payment_conf_no}`
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

function formatAmount(amount, show_sign) {
    // return amount ? amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, ',') : '0.00'
    if (!amount || isNaN(amount)) return "0.00";
    var parts = parseFloat(amount).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return show_sign ? `₱ ${parts.join(".")}` : parts.join(".");
}

function formatTIN(tin) {
                    
    if(tin){
        
        tin = tin.toString().replace(/-/g,'')
    }
    if(tin && tin.length > 3 && tin.length <7){                        
       return `${tin.substring(0, 3)}-${tin.substring(3, tin.length)}`
    }else if(tin && tin.length > 6 && tin.length < 10){
        return `${tin.substring(0, 3)}-${tin.substring(3, 6)}-${tin.substring(6, tin.length)}`
     }else if(tin && tin.length > 9){
        return `${tin.substring(0, 3)}-${tin.substring(3, 6)}-${tin.substring(6, 9)}-${tin.substring(9, tin.length)}`
     }else{
         return tin
     }
    //  {
    //     return tin && tin.length == 13 ? `${tin.substring(0, 3)}-${tin.substring(3, 6)}-${tin.substring(6, 9)}-${tin.substring(9, 13)}` : tin
    // }

    
}

module.exports = {
    file,
    pay
}