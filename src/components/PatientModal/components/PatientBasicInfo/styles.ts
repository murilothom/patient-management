import { Dropdown } from 'primereact/dropdown';
import { css, styled } from 'styled-components';
import Date from 'react-datepicker';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  margin-top: 2.1875rem;

  & > div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1.85375rem;
    row-gap: 0.875rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.1875rem;
    color: ${({ theme }) => theme['gray-400']};
    font-size: 0.875rem;
    width: 14.35375rem;
    position: relative;
  }

  input, textarea {
    padding: 0.3125rem 0.9375rem;
    border-radius: 5px;
    color: ${({ theme }) => theme['gray-500']};
    font-size: 0.875rem;
    width: 100%;

    &::placeholder {
      color: ${({ theme }) => theme['gray-300']};
    }
  }

  textarea {
    resize: none;
    height: 4.5625rem;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
  }
`;

interface InputProps {
  $error: boolean;
}

export const Select = styled(Dropdown)<InputProps>`
  height: 2rem;
  border-radius: 5px;
  border: 1px solid ${({ theme, $error }) => $error ? theme.red : theme['gray-200']};
  padding: 0.1875rem 0.9375rem;
`;

export const ButtonWrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 2.4375rem;

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

    &:hover {
      filter: brightness(0.95);
    }
  }
`;

export const Input = styled.input<InputProps>`
  border: 1px solid ${({ theme, $error }) => $error ? theme.red : theme['gray-200']};

  ${({ $error }) => $error && css`
      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.red};
        border: none;
      }
  `}
`;

export const Textarea = styled.textarea<InputProps>`
  border: 1px solid ${({ theme, $error }) => $error ? theme.red : theme['gray-200']};

  ${({ $error }) => $error && css`
      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.red};
        border: none;
      }
  `}
`;

export const DatePicker = styled(Date)<InputProps>`
  border: 1px solid ${({ theme, $error }) => $error ? theme.red : theme['gray-200']};

  ${({ $error }) => $error && css`
      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.red};
        border: none;
      }
  `}
`;
