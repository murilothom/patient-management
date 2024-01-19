import { AddPatientButton, ButtonsWrapper, PatientsContainer, PatientsHeader } from "./styles";
import { SearchField } from "./components/SearchFIeld";
import { Plus } from "phosphor-react";
import { PatientsTable } from "./components/PatientsTable";
import { DeletePatientModal } from "../DeletePatientModal";
import { useContextSelector } from "use-context-selector";
import { PatientsContext } from "../../contexts/PatientsContext";

export function Patients() {
  const {
    patients
  } = useContextSelector(
    PatientsContext,
    (context) => context
  );

  return (
    <PatientsContainer>
      <PatientsHeader>
        <h1>Listagem de pacientes</h1>

        <ButtonsWrapper>
          <SearchField />

          <AddPatientButton>
            <div>
              <Plus color="white" weight="bold" size={18} />
            </div>
            <span>
              Adicionar paciente
            </span>
          </AddPatientButton>
        </ButtonsWrapper>
      </PatientsHeader>

      {patients.length ? (
        <PatientsTable patients={patients} />
      ) : null}

      <DeletePatientModal />
    </PatientsContainer>
  );
}
