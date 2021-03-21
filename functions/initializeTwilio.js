const functions = require('firebase-functions');

const client = require('twilio')(
  functions.config().twilio.account_sid,
  functions.config().twilio.auth_token
);

const verificationService = async () => {
  const service = await client.verify.services.create({
    friendlyName: 'My First Verify Service',
  });

  console.log(`SERVICE SID: ${service.sid}`);
  return service.sid;
};

// phoneNumber: E.164 format
const sendVerifyPhoneNumber = async (phoneNumber, serviceSid) => {
  const verification = await client.verify
    .services(serviceSid)
    .verifications.create({ to: phoneNumber, channel: 'sms' });

  console.log(`VERIFICATION STATUS: ${verification.status}`);
  return verification.status;
};

const checkVerification = async (phoneNumber, token, serviceSid) => {
  const verificationCheck = await client.verify
    .services(serviceSid)
    .verificationChecks.create({ to: phoneNumber, code: token });

  console.log(`VERIFICATION CHECK STATUS: ${verificationCheck.status}`);
  return verificationCheck.status;
};

module.exports = {
  client,
  checkVerification,
  verificationService,
  sendVerifyPhoneNumber,
};
