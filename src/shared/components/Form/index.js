import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color, size } from '../../utils/styles';

export default function Form({ children, error, onSubmit, centered = false }) {
  return (
    <StyledForm onSubmit={onSubmit} centered>
      {error && <Error className="error">{error}</Error>}
      <InputContainer>{children}</InputContainer>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  position: relative;
  margin-top: ${size.spacing.large}px;
  /* text-align: ${(props) => (props.centered ? 'center' : 'left')} */
`;

const InputContainer = styled.div`
  max-width: 250px;
  display: grid;
  grid-gap: ${size.spacing.small}px;
`;

const Error = styled.span`
  position: absolute;
  top: 0;
  transform: translateY(calc(-100% - ${size.spacing.tiny}px));

  color: ${color.error};
  font-size: ${size.font.small}px;
`;

Form.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  centered: PropTypes.bool,
};
