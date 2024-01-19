import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.blue};
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme['gray-700']};
    -webkit-font-smoothing: antialiased;
  }

  body,
  input,
  textarea,
  button,
  h1,
  h2,
  h3,
  h4,
  a,
  p {
    font: 400 1rem 'Source Sans 3', Arial, Helvetica, sans-serif;
  }
`;
