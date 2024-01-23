import { styled } from 'styled-components';

export const PatientContainer = styled.div`
  border: 1px solid ${({ theme }) => theme['gray-300']};
  width: 100%;
  height: 7.5rem;
  border-radius: 2px;
  padding: 0.75rem;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  & > button[aria-label="open-action-buttons"] {
      background-color: transparent;
      line-height: 0;
      border: none;
      padding: 0.25rem;
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }

  strong, span {
    font-size: 0.875rem;

    @media (max-width: 400px) {
      font-size: 0.8125rem;
    }
  }

  span {
    margin-top: -4px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PatientImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  max-width: 100%;
  border-radius: 50%;
  object-fit: contain;
`;

export const ActionsButtonsWrapper = styled.div`
  position: absolute;
  width: 9.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  top: 1.5rem;
  right: 1rem;

  & > button {
    font-size: 0.875rem;
    color: ${({ theme }) => theme['gray-400']};
    background-color: ${({ theme }) => theme['gray-100']};
    width: 100%;
    text-align: left;
    padding: 0.5rem 0.875rem;
    z-index: 1;
    border: 1px solid ${({ theme }) => theme['gray-300']};

    &:first-child {
      border-radius: 5px 5px 0 0;
    }

    &:last-child {
      border-radius: 0 0 5px 5px;
      border-top: none;
    }
  }
`;
