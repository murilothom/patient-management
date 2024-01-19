import { useEffect, useState } from "react";
import { AddPatientButton, ButtonsWrapper, PatientsContainer, PatientsHeader } from "./styles";
import { Patient } from "../../types/Patient";
import { SearchField } from "./components/SearchFIeld";
import patientsService from "../../api/patientsService";
import { Plus } from "phosphor-react";
import { PatientsTable } from "./components/PatientsTable";
import { toast } from "react-toastify";

export function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);

  async function getPatients() {
    try {
      const patients = await patientsService.get();
      setPatients(patients);
    } catch (error) {
      toast.error('Ocorreu um erro ao buscar os pacientes.');
    }
  }

  useEffect(() => {
    getPatients();
  }, []);

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
    </PatientsContainer>
  );
}
