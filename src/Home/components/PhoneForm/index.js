import React, { useState } from 'react';

import { useFirebase, useModal } from '../../../shared/context';
import * as MODAL from '../../../shared/constants/modal';
import Form from '../../../shared/components/Form';
import PhoneInput from '../PhoneInput';

const validateInput = (value) => {
  let error = null;

  if (!value) {
    error = 'Phone number required';
  } else if (value.length !== 14) {
    error = 'Not a valid phone number';
  }

  return error;
};

export default function PhoneForm() {
  const firebase = useFirebase();
  const { dispatch } = useModal();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validateInput(phoneNumber);

    if (!validationError) {
      try {
        const res = await firebase.addSubscriber(phoneNumber);

        dispatch({
          type: MODAL.SHOW,
          modalType: MODAL.VERIFY,
          modalProps: { phoneNumber: res.data.phoneNumber },
        });
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    } else {
      setError(validationError);
    }
  }

  return (
    <Form onSubmit={handleSubmit} error={error}>
      <PhoneInput
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        setError={setError}
      />
      <button type="submit">Give me cat facts!</button>
    </Form>
  );
}
