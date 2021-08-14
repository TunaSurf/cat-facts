const functions = require('firebase-functions');
const { admin, db } = require('../initializeFirebase');
const {
  sendVerifyPhoneNumber,
  verificationService,
} = require('../initializeTwilio');
const { normalizePhoneNumber } = require('../utilities/normalizePhoneNumber');

async function sendVerification(phone, sid) {
  const e164PhoneNumber = `+1${phone}`;

  try {
    const verificationStatus = await sendVerifyPhoneNumber(
      e164PhoneNumber,
      sid
    );

    return {
      phoneNumber: e164PhoneNumber,
      status: verificationStatus,
    };
  } catch (error) {
    console.log(error);
    throw new functions.https.HttpsError(
      'unknown',
      'There was an issue verifying with Twilio.'
    );
  }
}

const addSubscriber = functions.https.onCall(async (data, context) => {
  const normalizedPhoneNumber = normalizePhoneNumber(data.phoneNumber);
  const doc = await db.doc(`subscribers/${normalizedPhoneNumber}`).get();

  if (doc.exists) {
    // Document already exists
    // check if verification status is 'pending'
    if (doc.data().verified === 'pending') {
      // Only allow a new verification to be sent out after 2 minutes have
      // passed since the previous verification request.
      if (Date.now() - doc.data().verificationSentTime.toMillis() > 120000) {
        // send another verification
        const verification = await sendVerification(
          normalizedPhoneNumber,
          doc.data().verificationSid
        );
        // update doc in firestore to reflect current status and time
        try {
          await db.doc(`subscribers/${normalizedPhoneNumber}`).set(
            {
              verified: verification.status,
              verificationSentTime: admin.firestore.Timestamp.now(),
            },
            { merge: true }
          );
        } catch (error) {
          throw new functions.https.HttpsError('internal', 'Database error');
        }
      } else {
        throw new functions.https.HttpsError(
          'failed-precondition',
          'You must wait 2 minutes to resend a verification request.'
        );
      }
    } else {
      throw new functions.https.HttpsError(
        'already-exists',
        'This phone number is already subscribed to Cat Facts.'
      );
    }
  } else {
    // No document found, this is a new phone number
    // Create a verification service sid for this number
    const verificationSid = await verificationService();
    // Send verification
    const verification = await sendVerification(
      normalizedPhoneNumber,
      verificationSid
    );
    // Create a new document
    try {
      await db.doc(`subscribers/${normalizedPhoneNumber}`).set({
        phoneNumber: verification.phoneNumber,
        factsSent: 0,
        verified: verification.status,
        verificationSentTime: admin.firestore.Timestamp.now(),
        verificationSid,
      });
    } catch (error) {
      throw new functions.https.HttpsError('internal', 'Database error');
    }
  }

  // Returning the added phone number to the client.
  return { phoneNumber: data.phoneNumber };
});

module.exports = { addSubscriber };
