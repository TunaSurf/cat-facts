import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color, size } from '../../../shared/utils/styles';

export default function Container({ children }) {
  return (
    <LayoutContainer>
      <Header>Cat Facts</Header>
      <ContentContainer>{children}</ContentContainer>
      <Footer>
        <a href="https://chaseburgess.com">Chase Burgess</a> |{' '}
        {new Date().getFullYear()}
      </Footer>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${size.spacing.base}px;
  min-height: 100vh;
  min-height: -webkit-fill-available; // mobile safari adds a scrollbar for 100vh
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto min-content;
`;

const Header = styled.p`
  position: absolute;
  margin: 0;
  font-size: ${size.font.regular};
  font-weight: 700;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: row-reverse;
  // flex-wrap: wrap;
`;

const Footer = styled.footer`
  text-align: center;
  font-size: ${size.font.small}px;
  color: ${color.grey};
  padding-top: ${size.spacing.base}px;

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

Container.propTypes = {
  children: PropTypes.node,
};
