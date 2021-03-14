const functions = require('firebase-functions');
const { db } = require('./initializeFirebase');
const {
  verificationService,
  sendVerifyPhoneNumber,
} = require('./initializeTwilio');

const addSubscriber = functions.https.onCall(async (data, context) => {
  const normalizedPhoneNumber = data.phoneNumber.replace(/[^\d]/g, '');
  const doc = await db.doc(`subscribers/${normalizedPhoneNumber}`).get();

  if (doc.exists) {
    // Document already exists
    throw new functions.https.HttpsError(
      'already-exists',
      'This phone number is already subscribed to Cat Facts.'
    );
  }

  try {
    const e164PhoneNumber = `+1${normalizedPhoneNumber}`;
    const sid = await verificationService();
    const verificationStatus = await sendVerifyPhoneNumber(
      e164PhoneNumber,
      sid
    );

    await db.doc(`subscribers/${normalizedPhoneNumber}`).set({
      phoneNumber: e164PhoneNumber,
      factsSent: 0,
      verified: verificationStatus,
    });

    // TODO: Send an introductory Cat Fact
  } catch (error) {
    console.error('internal-error', error);
    throw new functions.https.HttpsError(
      'internal-error',
      'There was an error adding your phone number to our system, please try again later.'
    );
  }

  console.log('New subscriber added');
  // Returning the added phone number to the client.
  return { phoneNumber: normalizedPhoneNumber };
});

module.exports = addSubscriber;
