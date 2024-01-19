import { Dropdown } from 'primereact/dropdown';
import { styled } from 'styled-components';

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
  }

  input, select, option, textarea {
    padding: 0.3125rem 0.9375rem;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme['gray-200']};
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

export const Select = styled(Dropdown)`
  height: 2rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme['gray-200']};
  padding: 0.1875rem 0.9375rem;
`;

export const ButtonWrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 3.4375rem;

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
