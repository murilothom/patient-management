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

  .p-dropdown-item {
  background-color: #fff;
  border: 1px solid #E8E8E8;
  padding: 0.3125rem 0.875rem;
  font-size: 0.875rem;
  color: #565656;
}

.p-dropdown-item:last-child {
  border-radius: 0 0 8px 8px;
}

.p-dropdown-label {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
}

.react-datepicker-wrapper div svg {
  font-size: 1.25rem;
  top: 20%;
  left: 6%;
  padding: 0 !important;
}

.react-datepicker-wrapper div input {
  padding-left: 2.75rem;
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
