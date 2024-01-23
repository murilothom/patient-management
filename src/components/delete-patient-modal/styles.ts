import { Dialog } from 'primereact/dialog';
import { styled } from 'styled-components';

export const DialogContainer = styled(Dialog)`
  position: relative;
  z-index: 50;
`;

export const DialogWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #00000075;
`;

export const DialogPanel = styled.div`
  width: 32.3125rem;
  background-color: ${({ theme }) => theme.white};

  @media (max-width: 720px) {
    width: 100%;
    margin: 0 0.75rem;
    border-radius: 4px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.purple};
  font-weight: 600;
`;

export const CloseButton = styled.button`
  line-height: 0;
  background-color: transparent;
  cursor: pointer;
  border: none;
  
  &:focus {
    box-shadow: none;
  }
`;

export const Content = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme['gray-300']};
  border-left: none;
  border-right: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 0;

  @media (max-width: 720px) {
    padding: 1rem 0;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;

    @media (max-width: 720px) {
      gap: 0.75rem;
      padding: 0.5rem 1rem;
    }

    & > h4 {
      font-weight: 600;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;

const BaseButton = styled.button`
  padding: 0.34375rem 1rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 4px;
`;

export const CancelButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.blue};
  background-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme['light-blue']};
  }
`;

export const DeleteButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.red};

  &:hover {
    filter: brightness(0.95);
  }

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.red};
  }
`;
