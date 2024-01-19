import styled from 'styled-components';

export const PatientsContainer = styled.section`
  max-width: 64.5rem;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  border-radius: 8px 8px 0px 0px;
  margin-bottom: 3rem;
`;

export const PatientsHeader = styled.header`
  padding: 1.71875rem 3.65625rem;
  background-color: ${({ theme }) => theme.white};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 8px 8px;

  & > h1 {
    color: ${({ theme }) => theme.black};
    font-size: 0.875rem;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.71875rem;
  justify-content: center;
  align-items: center;
`;

export const AddPatientButton = styled.button`
  height: 2rem;
  background-color: ${({ theme }) => theme.blue};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.white};
  line-height: 0;
  padding: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;

  & > span {
    font-size: 0.875rem;
    font-weight: 600;
  }
`;
