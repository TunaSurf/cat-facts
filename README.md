# Cat Facts

Cat Facts allows users to subscribe with a phone number to fun facts about cats, messaged directly to them!

![Cat facts homepage](/docs/screenshot-main.png)

On visiting the Cat Facts homepage, a user submits the phone numbers at which they wish to receive Cat Facts messages. The submitted phone number is verified for validity and against a database of existing subscribed numbers. If the number is not already stored in the Cat Facts database, the user will receive a Twilio message asking them to verify the phone number. Once verified on the website, the phone number will be added to the database and Cat Facts will begin being sent to the newly added number.

## How to run

Running Cat Facts requires a Twilio and Google Firebase account. Start by adding a file named `.env` to the home directory with the following contents (using your Twilio and Firebase account credentials):

    REACT_APP_API_KEY = [YOUR_CREDENTIALS]
    REACT_APP_AUTH_DOMAIN = [YOUR_CREDENTIALS]
    REACT_APP_DATABASE_URL = [YOUR_CREDENTIALS]
    REACT_APP_PROJECT_ID = [YOUR_CREDENTIALS]
    REACT_APP_STORAGE_BUCKET = [YOUR_CREDENTIALS]
    REACT_APP_MESSAGING_SENDER_ID = [YOUR_CREDENTIALS]
    REACT_APP_APP_ID = [YOUR_CREDENTIALS]

    TWILIO_ACCOUNT_SID = [YOUR_CREDENTIALS]
    TWILIO_AUTH_TOKEN = [YOUR_CREDENTIALS]
    TWILIO_PHONE_NUMBER = [YOUR_CREDENTIALS]

Inside the `functions` directory, run `npm install` to install the cloud functions related dependencies.

Install the Firebase CLI with `npm install -g firebase-tools`, and follow the instructions on [this page](https://firebase.google.com/docs/functions/get-started) for initializing the Firebase project and deploying the cloud functions.

Inside the base directory, run `npm install` to install the client related dependencies, and then run the client with `npm start`.
