const functions = require('firebase-functions');

const client = require('twilio')(
  functions.config().twilio.account_sid,
  functions.config().twilio.auth_token
);

const verificationService = async () => {
  const service = await client.verify.services.create({
    friendlyName: 'Cat Facts Verify Service',
  });

  // console.log(`SERVICE SID: ${service.sid}`);
  return service.sid;
};

// phoneNumber: E.164 format
const sendVerifyPhoneNumber = async (phoneNumber, serviceSid) => {
  const verification = await client.verify
    .services(serviceSid)
    .verifications.create({ to: phoneNumber, channel: 'sms' });

  // console.log(`VERIFICATION STATUS: ${verification.status}`);
  return verification.status;
};

const checkVerification = async (phoneNumber, token, serviceSid) => {
  const verificationCheck = await client.verify
    .services(serviceSid)
    .verificationChecks.create({ to: phoneNumber, code: token });

  // console.log(`VERIFICATION CHECK STATUS: ${verificationCheck.status}`);
  return verificationCheck.status;
};

const sendMessage = async (body, to) => {
  const message = await client.messages.create({
    body: 'Hello from Node',
    messagingServiceSid: functions.config().twilio.messaging_service_sid,
    to,
  });

  console.log(`MESSAGE SENT SID: ${message.sid}`);
};

module.exports = {
  client,
  checkVerification,
  verificationService,
  sendVerifyPhoneNumber,
  sendMessage,
};
