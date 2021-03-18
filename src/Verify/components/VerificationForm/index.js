import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useFirebase } from '../../../shared/context';

export default function VerificationForm({ phoneNumber }) {
  const firebase = useFirebase();
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);

  function handleChange({ target: { value } }) {
    setVerificationCode(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await firebase.verifySubscriber(
        phoneNumber,
        verificationCode
      );
      console.log(res);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="verification-code">Verification Code</label>
        <input
          type="text"
          name="verification-code"
          id="verification-code"
          value={verificationCode}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
      </div>
      <button type="submit">Verify Phone Number</button>
    </form>
  );
}

VerificationForm.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
};
