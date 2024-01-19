import { css, styled } from 'styled-components';
import { Dialog } from '@headlessui/react';

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

export const DialogPanel = styled(Dialog.Panel)`
  width: 49.5rem;
  height: 44.1875rem;
  background-color: ${({ theme }) => theme.white};
  padding: 2rem 1.25rem;
  border-radius: 10px;
  position: relative;
`;

export const NavBar = styled.nav`
  width: 100%;
  border-bottom:  2px solid ${({ theme }) => theme['gray-200']};
  padding-bottom: 1.125rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.125rem;
  margin-bottom: 1.6875rem;
`;

interface Active {
  $isActive: boolean
}

export const NavBarButton = styled.button<Active>`
  background-color: transparent;
  color: ${({ theme, $isActive }) => ($isActive ? theme['dark-purple'] : theme['gray-400'])};
  border: none;
  position: relative;
  cursor: pointer;

  &:hover {
    filter: brightness(0.85);
  }

  ${({ $isActive }) => $isActive && css`
    &::after {
      position: absolute;
      content: '';
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme['dark-purple']};
      bottom: -1.25rem;
      left: 0;
    }
  `}
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  line-height: 0;
  background-color: transparent;
  cursor: pointer;
  border: none;
  
  &:focus {
    box-shadow: none;
  }
`;
