import { Patient } from "../../../../types/Patient";
import { ArrowsDownUp } from "phosphor-react";
import { PatientsTableContainer, TableHead } from "./styles";
import { PatientDetail } from '../Patient'

interface Props {
  patients: Patient[]
}

export function PatientsTable({ patients }: Props) {
  return (
    <PatientsTableContainer>
      <TableHead>
        <tr>
          <th>
            <button>
              Nome
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button>
              CPF
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" /></button>
          </th>
          <th>
            <button>
              Data de nascimento
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button>
              E-mail
              <ArrowsDownUp size={20} weight="bold" color="#136CDC" />
            </button>
          </th>
          <th>
            <button>
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
