import styled from 'styled-components';

export const PatientInfo = styled.td`
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme['gray-700']};
  font-size: 0.875rem;

  & > button[aria-label="open-action-buttons"] {
    background-color: transparent;
    cursor: pointer;
    line-height: 0;
    border: none;
    padding: 0.25rem;
    position: relative;
  }

  & > span, & > button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &:first-child {
    color: ${({ theme }) => theme.blue};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ActionsButtonsWrapper = styled.div`
  position: absolute;
  width: 9.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > button {
    font-size: 0.875rem;
    cursor: pointer;
    color: ${({ theme }) => theme['gray-400']};
    background-color: ${({ theme }) => theme.white};
    width: 100%;
    text-align: left;
    padding: 0.625rem 1rem;
    z-index: 1;
    border: 1px solid ${({ theme }) => theme['gray-200']};

    &:first-child {
      border-radius: 5px 5px 0 0;
    }

    &:last-child {
      border-radius: 0 0 5px 5px;
      border-top: none;
    }

    &:hover {
      color: ${({ theme }) => theme.blue};
      background-color: ${({ theme }) => theme['light-blue']};
    }

    &:focus {
      box-shadow: none;
    }
  }
`;
