import { X } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import {
  CloseButton,
  DialogContainer,
  DialogWrapper,
  DialogPanel,
  Header,
  Title,
  Content,
  ButtonsWrapper,
  CancelButton,
} from './styles';
import DeletePatientImg from '../../assets/delete-patient-image.png';
import { ModalContext } from '../../contexts/ModalContext';
import { PatientsContext } from '../../contexts/PatientsContext';

export function PatientModal() {
  const {
    handleClosePatientModal,
    isPatientModalOpen,
  } = useContextSelector(
    ModalContext,
    (context) => context,
  );

  const {
    setCurrentPatient,
    // fetchPatients,
  } = useContextSelector(
    PatientsContext,
    (context) => context,
  );

  const onClose = () => {
    setCurrentPatient(null);
    handleClosePatientModal();
  };

  return (
    <DialogContainer open={isPatientModalOpen} onClose={onClose}>
      <DialogWrapper>
        <DialogPanel>
          <Header>
            <Title>Excluir paciente?</Title>

            <CloseButton onClick={onClose}>
              <X size={24} weight="bold" color="#656565" />
            </CloseButton>
          </Header>

          <Content>
            <img src={DeletePatientImg} alt="" />

            <div>
              <h3>Tem certeza que deseja excluir o paciente selecionado?</h3>
              <h4>Essa ação não poderá ser desfeita.</h4>
            </div>
          </Content>

          <ButtonsWrapper>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
          </ButtonsWrapper>
        </DialogPanel>
      </DialogWrapper>
    </DialogContainer>
  );
}
