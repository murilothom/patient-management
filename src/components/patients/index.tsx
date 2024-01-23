import { Plus } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import {
  AddPatientButton,
  ButtonsWrapper,
  PatientsContainer,
  PatientsHeader,
} from './styles';
import { SearchField } from './components/search-field';
import { PatientsTable } from './components/patients-table';
import { DeletePatientModal } from '../delete-patient-modal';
import { PatientsContext } from '../../contexts/patients-context';
import { PatientModal } from '../patient-modal';
import { ModalContext } from '../../contexts/modal-context';

export function Patients() {
  const {
    patients,
    isFetchingPatients,
    setCurrentPatient,
  } = useContextSelector(PatientsContext, (context) => context);

  const { handleOpenPatientModal } = useContextSelector(
    ModalContext,
    (context) => context,
  );

  const openPatientModal = () => {
    setCurrentPatient(null);
    handleOpenPatientModal();
  };

  return (
    <PatientsContainer>
      <PatientsHeader $isFetching={isFetchingPatients}>
        <h1>Listagem de pacientes</h1>

        <ButtonsWrapper>
          <SearchField />

          <AddPatientButton onClick={openPatientModal}>
            <div>
              <Plus color="white" weight="bold" size={18} />
            </div>
            <span>Adicionar paciente</span>
          </AddPatientButton>
        </ButtonsWrapper>
      </PatientsHeader>

      {patients.length ? <PatientsTable patients={patients} /> : null}

      <DeletePatientModal />
      <PatientModal />
    </PatientsContainer>
  );
}
