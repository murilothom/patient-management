import { useState } from 'react';
import { X } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import {
  CloseButton,
  DialogContainer,
  DialogWrapper,
  DialogPanel,
  NavBar,
  NavBarButton,
} from './styles';
import { ModalContext } from '../../contexts/ModalContext';
import { PatientsContext } from '../../contexts/PatientsContext';
import { PatientBasicInfo } from './components/PatientBasicInfo';

export enum Step {
  INFO = 1,
  CONTACT = 2,
}

export function PatientModal() {
  const [step, setStep] = useState<Step>(Step.INFO);

  const handleChangeStep = (nextStep: Step) => {
    setStep(nextStep);
  };

  const {
    handleClosePatientModal,
    isPatientModalOpen,
  } = useContextSelector(
    ModalContext,
    (context) => context,
  );

  const {
    setCurrentPatient,
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
          <CloseButton onClick={onClose}>
            <X size={24} weight="bold" color="#656565" />
          </CloseButton>
          <NavBar>
            <NavBarButton
              $isActive={step === Step.INFO}
              type="button"
              onClick={() => handleChangeStep(Step.INFO)}
            >
              Informações básicas
            </NavBarButton>
            <NavBarButton
              $isActive={step === Step.CONTACT}
              type="button"
              onClick={() => handleChangeStep(Step.CONTACT)}
            >
              Contato
            </NavBarButton>
          </NavBar>
          {step === Step.INFO && (<PatientBasicInfo handleChangeStep={handleChangeStep} />)}
          {step === Step.CONTACT && (<PatientBasicInfo handleChangeStep={handleChangeStep} />)}
        </DialogPanel>
      </DialogWrapper>
    </DialogContainer>
  );
}
