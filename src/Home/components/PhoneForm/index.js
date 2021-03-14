import React, { useState } from 'react';

import { useFirebase } from '../../../shared/context';

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

const validateInput = (value) => {
  let error = null;

  if (!value) {
    error = 'Required';
  } else if (value.length !== 14) {
    error = 'Invalid phone format. ex: (555) 555-5555';
  }

  return error;
};

export default function PhoneForm() {
  const firebase = useFirebase();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  function handleChange({ target: { value } }) {
    setPhoneNumber((prev) => normalizeInput(value, prev));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validateInput(phoneNumber);

    if (!validationError) {
      try {
        const res = await firebase.addSubscriber(phoneNumber);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError(validationError);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="phone-number">Phone Number</label>
        <input
          type="tel"
          name="phone-number"
          id="phone-number"
          value={phoneNumber}
          placeholder="(555) 555-5555"
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
      </div>
      <button type="submit">Give me cat facts!</button>
    </form>
  );
}
