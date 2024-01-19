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
  DeleteButton
} from './styles';
import { X } from 'phosphor-react';
import DeletePatientImg from '../../assets/delete-patient-image.png';
import { useContextSelector } from "use-context-selector";
import { DeletePatientModalContext } from '../../contexts/DeletePatientModalContext';
import { PatientsContext } from '../../contexts/PatientsContext';
import { Patient } from '../../types/Patient';

export function DeletePatientModal() {
  const {
    onClose,
    isOpen,
  } = useContextSelector(
    DeletePatientModalContext,
    (context) => context
  );

  const {
    handleDeletePatient,
    setCurrentPatient,
    fetchPatients
  } = useContextSelector(
    PatientsContext,
    (context) => context
  );

  async function deletePatient() {
    await handleDeletePatient();
    setCurrentPatient({} as Patient);
    await fetchPatients();
    onClose();
  } 

  return (
    <DialogContainer open={isOpen} onClose={onClose}>
      <DialogWrapper>
        <DialogPanel>
          <Header>
            <Title>Excluir paciente?</Title>

            <CloseButton onClick={onClose}>
              <X size={24} weight='bold' color='#656565' />
            </CloseButton>
          </Header>

          <Content>
            <img src={DeletePatientImg} />

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
  )
}
