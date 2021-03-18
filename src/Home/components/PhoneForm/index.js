import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useFirebase } from '../../../shared/context';
import { color, size } from '../../../shared/utils/styles';
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
  const history = useHistory();
  const firebase = useFirebase();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validateInput(phoneNumber);

    if (!validationError) {
      try {
        const res = await firebase.addSubscriber(phoneNumber);
        console.log(res);
        history.push('/verify', { phoneNumber });
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    } else {
      setError(validationError);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        {error && <Error className="error">{error}</Error>}
        <PhoneInput
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setError={setError}
        />
      </InputContainer>
      <button type="submit">Give me cat facts!</button>
    </Form>
  );
}

const Form = styled.form`
  position: relative;
  max-width: 250px;
  margin-top: ${size.spacing.large}px;
`;

const InputContainer = styled.div`
  margin-bottom: ${size.spacing.small}px;
`;

const Error = styled.span`
  position: absolute;
  top: -${size.font.small + size.spacing.tiny}px;

  color: ${color.error};
  font-size: ${size.font.small}px;
`;
