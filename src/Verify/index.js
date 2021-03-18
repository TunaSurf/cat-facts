import React from 'react';
import { useParams } from 'react-router-dom';

import VerificationForm from './components/VerificationForm';

export default function Verify() {
  const { phoneNumber } = useParams();

  return (
    <>
      <h1>Cat Facts</h1>
      <VerificationForm phoneNumber={phoneNumber} />
    </>
  );
}
