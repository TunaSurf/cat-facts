const functions = require('firebase-functions');
const { db } = require('./initializeFirebase');
const {
  checkVerification,
  sendVerifyPhoneNumber,
  verificationService,
} = require('./initializeTwilio');

const addSubscriber = functions.https.onCall(async (data, context) => {
  console.log('CALLING ADD SUBSCRIBER');
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
    console.error('internal', error);
    throw new functions.https.HttpsError(
      'internal',
      'There was an error adding your phone number to our system I need to add better error handling to narrow this down. Please try again later.'
    );
  }

  console.log('New subscriber added');
  // Returning the added phone number to the client.
  return { phoneNumber: normalizedPhoneNumber };
});

const verifySubscriber = functions.https.onCall(async (data, context) => {
  const { phoneNumber, token } = data;
  const doc = await db.doc(`subscribers/${phoneNumber}`).get();

  if (!doc.exists || doc.data().verified !== 'pending') {
    // Document already exists
    throw new functions.https.HttpsError(
      'failed-precondition',
      'There was no verification requested on this number.'
    );
  }

  try {
    const e164PhoneNumber = `+1${phoneNumber}`;
    const sid = await verificationService();
    const verificationStatus = await checkVerification(
      e164PhoneNumber,
      token,
      sid
    );

    if (verificationStatus === 'approved') {
      await db.doc(`subscribers/${phoneNumber}`).set(
        {
          verified: verificationStatus,
        },
        { merge: true }
      );
    }

    return { verificationStatus };
  } catch (error) {
    console.error('internal', error);
    throw new functions.https.HttpsError(
      'internal',
      'There was an error adding your phone number to our system I need to add better error handling to narrow this down. Please try again later.'
    );
  }
});

module.exports = { addSubscriber, verifySubscriber };
