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
  DeleteButton,
} from './styles';
import deletePatientImg from '../../assets/delete-patient-image.png';
import { ModalContext } from '../../contexts/modal-context';
import { PatientsContext } from '../../contexts/patients-context';

export function DeletePatientModal() {
  const {
    handleCloseDeleteModal,
    isDeleteModalOpen,
  } = useContextSelector(
    ModalContext,
    (context) => context,
  );

  const {
    handleDeletePatient,
    setCurrentPatient,
    fetchPatients,
  } = useContextSelector(
    PatientsContext,
    (context) => context,
  );

  const deletePatient = async () => {
    await handleDeletePatient();
    setCurrentPatient(null);
    await fetchPatients();
    handleCloseDeleteModal();
  };

  const onClose = () => {
    setCurrentPatient(null);
    handleCloseDeleteModal();
  };

  return (
    <DialogContainer
      visible={isDeleteModalOpen}
      unstyled
      onHide={onClose}
      modal
    >
      <DialogWrapper>
        <DialogPanel>
          <Header>
            <Title>Excluir paciente?</Title>

            <CloseButton onClick={onClose}>
              <X size={24} weight="bold" color="#656565" />
            </CloseButton>
          </Header>

          <Content>
            <img src={deletePatientImg} alt="" />

            <div>
              <h3>Tem certeza que deseja excluir o paciente selecionado?</h3>
              <h4>Essa ação não poderá ser desfeita.</h4>
            </div>
          </Content>

          <ButtonsWrapper>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
            <DeleteButton onClick={deletePatient}>Excluir</DeleteButton>
          </ButtonsWrapper>
        </DialogPanel>
      </DialogWrapper>
    </DialogContainer>
  );
}
