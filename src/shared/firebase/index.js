import firebase from 'firebase/app';
import 'firebase/functions';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export default class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      // Check that `window` is in scope for the analytics module!
      if (typeof window !== 'undefined') {
        // Enable analytics. https://firebase.google.com/docs/analytics/get-started
        if ('measurementId' in config) {
          firebase.analytics();
          firebase.performance();
        }
      }
    }

    this.functions = firebase.functions();
  }

  // Accepts a phone number, returns a promise
  addSubscriber = (phoneNumber) => {
    const httpsCallableFunc = this.functions.httpsCallable('addSubscriber');

    return httpsCallableFunc({ phoneNumber });
  };

  verifySubscriber = (phoneNumber, token) => {
    const httpsCallableFunc = this.functions.httpsCallable('verifySubscriber');

    return httpsCallableFunc({ phoneNumber, token });
  };
}
