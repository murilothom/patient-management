import { ArrowsDownUp } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import { PatientsTableContainer, TableHead } from './styles';
import { PatientsContext } from '../../../../contexts/patients-context';
import { PatientTableDetail } from '../patient-table-detail';

export function PatientsTable() {
  const {
    handleParams,
    patients,
  } = useContextSelector(
    PatientsContext,
    (context) => context,
  );

  return (
    <PatientsTableContainer>
      <TableHead>
        <tr>
          <th>
            <button type="button" onClick={() => handleParams({ sort: 'name' })}>
              Nome
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button type="button" onClick={() => handleParams({ sort: 'document' })}>
              CPF
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button type="button" onClick={() => handleParams({ sort: 'dateOfBirth' })}>
              Data de nascimento
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button type="button" onClick={() => handleParams({ sort: 'email' })}>
              E-mail
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button type="button" onClick={() => handleParams({ sort: 'city' })}>
              Cidade
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button type="button" disabled>Ações</button>
          </th>
        </tr>
      </TableHead>

      <tbody>
        {patients.map((patient) => (
          <PatientTableDetail key={patient._id} patient={patient} />
        ))}
      </tbody>
    </PatientsTableContainer>
  );
}
