const functions = require('firebase-functions');
const { db } = require('../initializeFirebase');
const { checkVerification, sendMessage } = require('../initializeTwilio');
const { normalizePhoneNumber } = require('../utilities/normalizePhoneNumber');

async function verifyNumber(phone, token, sid) {
  const e164PhoneNumber = `+1${phone}`;

  try {
    const verificationStatus = await checkVerification(
      e164PhoneNumber,
      token,
      sid
    );

    return verificationStatus;
  } catch (error) {
    console.log(error);
    throw new functions.https.HttpsError(
      'unknown',
      'There was an issue verifying with Twilio.'
    );
  }
}

const verifySubscriber = functions.https.onCall(async (data, context) => {
  const { phoneNumber, token } = data;
  const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);
  const doc = await db.doc(`subscribers/${normalizedPhoneNumber}`).get();

  if (!doc.exists || doc.data().verified !== 'pending') {
    // Document doesn't exist, or the number is not pending verification
    throw new functions.https.HttpsError(
      'failed-precondition',
      'There was no verification requested on this number.'
    );
  }

  const verificationStatus = await verifyNumber(
    normalizedPhoneNumber,
    token,
    doc.data().verificationSid
  );

  try {
    if (verificationStatus === 'approved') {
      await db.doc(`subscribers/${normalizedPhoneNumber}`).set(
        {
          verified: verificationStatus,
        },
        { merge: true }
      );
    }

    // Send a welcome message
    try {
      await sendMessage('Welcome to Cat Facts!', doc.data().phoneNumber);
    } catch (error) {
      console.log(error);
    }

    return { verificationStatus };
  } catch (error) {
    console.error('internal', error);
    throw new functions.https.HttpsError(
      'internal',
      'Error during verification'
    );
  }
});

module.exports = { verifySubscriber };
