import { useContextSelector } from 'use-context-selector';
import { useState } from 'react';
import { DropdownChangeEvent } from 'primereact/dropdown';
import {
  PatientListHeader, PatientListWrapper, PatientsListContainer, Select,
} from './styles';
import { PatientsContext } from '../../../../contexts/patients-context';
import { PatientListDetail } from '../patient-list-detail';

const filterOptions = [
  { value: 'createdAt', label: 'Sem filtro' },
  { value: 'name', label: 'Nome' },
  { value: 'document', label: 'CPF' },
  { value: 'dateOfBirth', label: 'Data de nascimento' },
  { value: 'email', label: 'E-mail' },
  { value: 'city', label: 'Cidade' },
];

export function PatientList() {
  const [filter, setFilter] = useState('createdAt');
  const {
    handleParams,
    patients,
  } = useContextSelector(
    PatientsContext,
    (context) => context,
  );

  const handleFilter = (option: DropdownChangeEvent) => {
    setFilter(option.value);
    handleParams({ sort: option.value });
  };

  return (
    <PatientsListContainer>
      <PatientListHeader>
        <span>
          Filtra por:
        </span>
        <Select
          name="filter"
          value={filter}
          options={filterOptions}
          onChange={handleFilter}
        />
      </PatientListHeader>

      <PatientListWrapper>
        {patients.map((patient) => (
          <PatientListDetail key={patient._id} patient={patient} />
        ))}
      </PatientListWrapper>

    </PatientsListContainer>
  );
}
