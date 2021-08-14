import React from 'react';
import PropTypes from 'prop-types';

const normalizeInput = (value, prev) => {
  // if value is empty, return empty
  if (!value) {
    return value;
  }

  // only want digits "1-9", replace all else
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;

  // check that the length of the new value  doesn't exceed 6 digits.
  // Otherwise, return prev.
  if (cvLength <= 6) {
    return currentValue;
  }

  return prev;
};

export default function VerificationCodeInput({
  verificationCode,
  setVerificationCode,
  setError,
}) {
  function handleChange({ target: { value } }) {
    setVerificationCode((prev) => normalizeInput(value, prev));
  }

  return (
    <>
      <input
        type="tel"
        name="verification-code"
        id="verification-code"
        aria-label="Verification code"
        title="Verification code"
        value={verificationCode}
        placeholder="555555"
        onChange={handleChange}
        onFocus={() => setError(null)}
      />
    </>
  );
}

VerificationCodeInput.propTypes = {
  verificationCode: PropTypes.string.isRequired,
  setVerificationCode: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};
