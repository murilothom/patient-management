import styled from 'styled-components';

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  @media(max-width: 720px) {
    padding: 0 1rem;
  }
`;
