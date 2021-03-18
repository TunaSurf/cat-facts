import { createGlobalStyle } from 'styled-components';

import bgPattern from './assets/images/kitty-pattern.svg';
import { color, size } from '../shared/utils/styles';

export default createGlobalStyle`
  html {
    background-color: ${color.lightGrey};
    background-image: url(${bgPattern});
    background-repeat: repeat;
    background-size: 700px 700px;

    max-width: 100%;

    color: ${color.darkGrey};

    font-size: ${size.font.large}px;
    font-family: 'Inter', sans-serif;
  }

  h1 {
    font-size: ${size.font.title};
  }

  input {
    -webkit-appearance: none;
  }

  button, input {
    width: 100%;
    padding: 10px 0;

    border: none;
    border-radius: 4px;

    text-align: center;

    box-shadow: 
      0px 16px 32px rgba(0, 0, 0, 0.1), 
      0px 8px 16px rgba(0, 0, 0, 0.1), 
      0px 4px 8px rgba(0, 0, 0, 0.1), 
      0px 2px 4px rgba(0, 0, 0, 0.1), 
      0px 1px 2px rgba(0, 0, 0, 0.1);
  }

  button {
    background-color: ${color.primary};
    color: ${color.lightGrey};
  }
`;
