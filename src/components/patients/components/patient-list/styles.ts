import { Dropdown } from 'primereact/dropdown';
import { styled } from 'styled-components';

export const PatientsListContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

export const PatientListHeader = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.white};

  display: grid;
  grid-template-columns: 3.75rem 10.55rem;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;

  & > span {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.black};
  }
`;

export const Select = styled(Dropdown)`
  height: 2.25rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme['gray-200']};
  padding: 0.1875rem 0.9375rem;
`;

export const PatientListWrapper = styled.div`
  padding-top: 1.875rem;
  padding-bottom: 1.875rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
`;
