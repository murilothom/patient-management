import { Plus } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import {
  AddPatientButton,
  ButtonsWrapper,
  PatientsContainer,
  PatientsHeader,
} from './styles';
import { SearchField } from './components/SearchFIeld';
import { PatientsTable } from './components/PatientsTable';
import { DeletePatientModal } from '../DeletePatientModal';
import { PatientsContext } from '../../contexts/PatientsContext';
import { PatientModal } from '../PatientModal';
import { ModalContext } from '../../contexts/ModalContext';

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
