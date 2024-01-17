import { Patient } from "../../../../types/Patient";
import { ArrowsDownUp, DotsThree } from "phosphor-react";
import { dateFormatter, documentFormatter } from "../../../../utils/formatter";
import { PatientsTableContainer } from "./styles";

interface Props {
  patients: Patient[]
}

export function PatientsTable({ patients }: Props) {
  return (
    <PatientsTableContainer>
      <thead>
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
      </thead>

      <tbody>
        {patients.map(patient => (
          <tr key={patient.id}>
            <td>
              <span>
                {patient.name}
              </span>
            </td>
            <td>
              <span>
                {documentFormatter(patient.document)}
              </span>
            </td>
            <td>
              <span>
                {dateFormatter.format(new Date(patient.dateOfBirth))}
              </span>
            </td>
            <td>
              <span>
                {patient.email}
              </span>
            </td>
            <td>
              <span>
                {patient.contact.city}
              </span>
            </td>
            <td>
              <button><DotsThree weight="bold" color="#000000" size={24} /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </PatientsTableContainer>
  );
}
