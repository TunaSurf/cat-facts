const functions = require('firebase-functions');
const { db } = require('./initializeFirebase');

const sendMsgToSubscribers = functions.pubsub
  .schedule('15 16 * * *') // This will be run every day at 4:15 PM
  // .schedule('* * * * *')
  .timeZone('America/New_York') // Eastern time
  .onRun(async (context) => {
    // Get a snapshot of all subscribers
    const snapshot = await db.collection('subscribers').get();

    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
    return null;
  });

module.exports = sendMsgToSubscribers;
