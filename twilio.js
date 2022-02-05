const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const sendSms = (number, message) => {
  return client.messages
    .create({
       body: message,
       from: process.env.PHONE_NUMBER_SID,
       to: number
     })
}

module.exports = sendSms;