import { ArrowsDownUp } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import { Patient } from '../../../../types/patient';
import { PatientsTableContainer, TableHead } from './styles';
import { PatientsContext } from '../../../../contexts/patients-context';
import { PatientDetail } from '../Patient';

interface Props {
  patients: Patient[]
}

export function PatientsTable({ patients }: Props) {
  const {
    handleParams,
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
          <PatientDetail key={patient._id} patient={patient} />
        ))}
      </tbody>
    </PatientsTableContainer>
  );
}
