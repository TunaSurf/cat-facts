import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useFirebase, useModal } from '../../../../shared/context';
import * as MODAL from '../../../../shared/constants/modal';
import Form from '../../../../shared/components/Form';
import VerificationCodeInput from './VerificationCodeInput';

const validateInput = (value) => {
  let error = null;

  if (!value) {
    error = 'Verification code required';
  } else if (value.length !== 6) {
    error = 'Not a valid verification code';
  }

  return error;
};

export default function VerifyModal({ phoneNumber }) {
  const firebase = useFirebase();
  const { dispatch } = useModal();
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validateInput(verificationCode);

    if (!validationError) {
      try {
        const res = await firebase.verifySubscriber(
          phoneNumber,
          verificationCode
        );
        console.log(res);
        // do something with res. probably a success modal
        dispatch({
          type: MODAL.SHOW,
          modalType: MODAL.SUCCESS,
          modalProps: {},
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
    <>
      <h2>Enter verification code for {phoneNumber}</h2>
      <Form onSubmit={handleSubmit} error={error} centered>
        <VerificationCodeInput
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          setError={setError}
        />
        <button type="submit">Verify</button>
      </Form>
    </>
  );
}

VerifyModal.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
};
