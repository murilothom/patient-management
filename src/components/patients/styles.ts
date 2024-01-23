import styled, { css } from 'styled-components';

export const PatientsContainer = styled.section`
  max-width: 64.5rem;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  border-radius: 8px 8px 0px 0px;
  margin-bottom: 3rem;

  @media (max-width: 1000px) {
    border-radius: 8px 8px 8px 8px;
  }
`;

interface IsFetching {
  $isFetching: boolean;
}

export const PatientsHeader = styled.header<IsFetching>`
  padding: 1.71875rem 3.65625rem;
  background-color: ${({ theme }) => theme.white};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 8px 8px;
  position: relative;

  @media(max-width: 720px) {
    padding: 1rem;
  }

  & > h1 {
    color: ${({ theme }) => theme.black};
    font-size: 0.875rem;
  }

  ${({ $isFetching }) => $isFetching && css`
    &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 3px;
    border-top: 3px solid ${({ theme }) => theme.blue};
    left: 0;
    bottom: -5px;
    z-index: 1;
    animation: loading 0.8s infinite;
  }
    `
}

  @keyframes loading {
    from {
      width: 0;
      left: 0;
      /* border-radius: 8px 0px 0px 0px; */
    }
    to {
      left: 60%;
      width: 40%;
      /* border-radius: 0px 8px 0px 0px; */
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.71875rem;
  justify-content: center;
  align-items: center;

  @media(max-width: 720px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const AddPatientButton = styled.button`
  width: 11.25rem;
  height: 2.5rem;
  padding: 0.625rem 0.9375rem;
  background-color: ${({ theme }) => theme.blue};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.white};
  line-height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  @media(max-width: 720px) {
    width: 10.55rem;
    height: 2.25rem;
  }

  & > span {
    font-size: 0.875rem;
    font-weight: 600;
  }
`;
