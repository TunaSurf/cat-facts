import React from 'react';
import styled from 'styled-components';

import PhoneForm from './components/PhoneForm';
import catImage from './assets/images/cat-facts.png';
import { color } from '../shared/utils/styles';

export default function Home() {
  return (
    <>
      <Img src={catImage} alt="cat with tongue out" />
      <Content>
        <section>
          <h1>
            Get the <span style={{ color: color.primary }}>Facts</span>
          </h1>
          <p>
            This is Cat Facts - facts about cats, get them sent to your phone
            every single day!
          </p>
        </section>
        <PhoneForm />
      </Content>
    </>
  );
}

const Img = styled.img`
  width: 90%;
  max-width: 400px;
`;

const Content = styled.div`
  max-width: 500px;
`;
