const functions = require('firebase-functions');

function normalizePhoneNumber(phone) {
  // Remove all characters that aren't numbers 0-9
  const normalized = phone.replace(/[^\d]/g, '');
  // a valid phonenumber should be 10 digits long - about as simple as validation gets
  if (normalized.length === 10) {
    return normalized;
  }

  throw new functions.https.HttpsError(
    'invalid-argument',
    'Phone number not valid.'
  );
}

module.exports = { normalizePhoneNumber };
