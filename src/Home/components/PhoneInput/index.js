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

  // check that the length of the new value is longer or shorter than the previous
  // value and that it doesn't exceed 10 digits. Otherwise, return prev.
  if (cvLength !== prev.length && cvLength <= 10) {
    if (cvLength < 4) {
      return currentValue;
    }

    if (cvLength < 7) {
      // add parentheses
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    }

    // add a dash
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
      3,
      6
    )}-${currentValue.slice(6, 10)}`;
  }

  return prev;
};

export default function PhoneInput({ phoneNumber, setPhoneNumber, setError }) {
  function handleChange({ target: { value } }) {
    setPhoneNumber((prev) => normalizeInput(value, prev));
  }

  return (
    <>
      <input
        type="tel"
        name="phone-number"
        id="phone-number"
        aria-label="Phone number"
        title="Phone Number"
        value={phoneNumber}
        placeholder="(702) 123-4567"
        onChange={handleChange}
        onFocus={() => setError(null)}
      />
    </>
  );
}

PhoneInput.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};
