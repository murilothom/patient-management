import styled, { css } from 'styled-components';

export const Form = styled.form`
  height: 100%;

  div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1.85375rem;
    row-gap: 0.875rem;

    @media (max-width: 1000px) {
      grid-template-columns: repeat(2, 1fr);
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.1875rem;
      color: ${({ theme }) => theme['gray-400']};
      font-size: 0.875rem;
      width: 14.35375rem;
      position: relative;

      @media (max-width: 1000px) {
        width: 100%;
      }
    }

    input {
      padding: 0.3125rem 0.9375rem;
      border-radius: 5px;
      color: ${({ theme }) => theme['gray-500']};
      font-size: 0.875rem;
      width: 100%;

      &::placeholder {
        color: ${({ theme }) => theme['gray-300']};
      }
    }
  }

  footer {
    width: 100%;
    height: calc(100% - 16.3125rem);
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    @media (max-width: 1000px) {
      height: auto;
      margin-top: 1.5rem;
      width: 100%;
    }

    button[type="submit"] {
      background-color: ${({ theme }) => theme.blue};
      color:  ${({ theme }) => theme.white};
      width: 12.835rem;
      height: 2rem;
      cursor: pointer;
      border: none;
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: 4px;

      @media (max-width: 1000px) {
        width: 100%;
      }

      &:hover {
        filter: brightness(0.95);
      }

      &:disabled {
        background-color:  ${({ theme }) => theme['gray-400']};
        cursor: progress;
      }
    }
  }
`;

interface InputProps {
  $error: boolean;
}

export const Input = styled.input<InputProps>`
  border: 1px solid ${({ theme, $error }) => ($error ? theme.red : theme['gray-200'])};

  ${({ $error }) => $error && css`
      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.red};
        border: none;
      }
  `}
`;
