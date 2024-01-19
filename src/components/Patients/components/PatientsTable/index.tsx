import { Patient } from "../../../../types/Patient";
import { ArrowsDownUp } from "phosphor-react";
import { PatientsTableContainer, TableHead } from "./styles";
import { PatientDetail } from '../Patient'
import { useContextSelector } from "use-context-selector";
import { PatientsContext } from "../../../../contexts/PatientsContext";

interface Props {
  patients: Patient[]
}

export function PatientsTable({ patients }: Props) {
  const {
    handleParams
  } = useContextSelector(
    PatientsContext,
    (context) => context,
  );

  return (
    <PatientsTableContainer>
      <TableHead>
        <tr>
          <th>
            <button onClick={() => handleParams({ sort: 'name' })}>
              Nome
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button onClick={() => handleParams({ sort: 'document' })}>
              CPF
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button onClick={() => handleParams({ sort: 'dateOfBirth' })}>
              Data de nascimento
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button onClick={() => handleParams({ sort: 'email' })}>
              E-mail
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button onClick={() => handleParams({ sort: 'contact.city' })}>
              Cidade
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button disabled>Ações</button>
          </th>
        </tr>
      </TableHead>

      <tbody>
        {patients.map(patient => (
          <PatientDetail key={patient.id} patient={patient} />
        ))}
      </tbody>
    </PatientsTableContainer>
  );
}
