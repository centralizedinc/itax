'use strict'

const sgMail = require('@sendgrid/mail');

// Utils
const ApplicationSettings = require('./ApplicationSettings');
const jwt = require('jsonwebtoken');

Date.prototype.addHours = function (hours) {
  this.setTime(this.getTime() + (hours * 60 * 60 * 1000));
  return this;
}

class SendEmail {

  static setKeys() {
    console.log('SENDGRID_API_KEY :', ApplicationSettings.getValue("SENDGRID_API_KEY"));
    sgMail.setApiKey(ApplicationSettings.getValue("SENDGRID_API_KEY"));
    sgMail.setSubstitutionWrappers('{{', '}}');
  }

  static registration(email, name, account_id) {
    const expiry_date = new Date().addHours(24);
    console.log('expiry_date :', expiry_date);
    const confirmation_token = new Buffer(JSON.stringify({
      account_id,
      date: new Date(),
      expiry_date
    })).toString('base64')
    const confirmation_url = `http://localhost:8080/#/confirmation/${confirmation_token}`
    console.log('confirmation_url :', confirmation_url);
    const msg = {
      to: email,
      from: ApplicationSettings.getValue("ITAX_EMAIL"),
      templateId: ApplicationSettings.getValue("REGISTRATION_EMAIL_TEMPLATE"),
      substitutions: { name, confirmation_url }
    };
    return new Promise((resolve, reject) => {
      sgMail.send(msg)
        .then((result) => {
          resolve({ result, confirmation_url, expiry_date })
        }).catch((err) => reject(err));
    })
  }

  static updateProfile(username, email, cb) {
    const msg = {
      to: 'ariel.a.balita@gmail.com',
      from: 'itax-pro@itax.com',
      templateId: 'e0d8666d-d31a-4bba-b366-50361c400565',
      substitutions: {
        name: 'Some One',
        city: 'Denver',
      },
    };
    sgMail.send(msg).then(() => {
      cb("success")
    }).catch(error => {
      //Log friendly error
      console.error(error.toString());
      cb(error);
    });
  }
}
module.exports = SendEmail
