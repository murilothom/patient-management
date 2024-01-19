import { useEffect, useState } from 'react';
import { X } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Contact } from './components/Contact';
import { PatientSchema, patientSchema } from '../../types/PatientSchema';

export enum Step {
  INFO = 1,
  CONTACT = 2,
}

export function PatientModal() {
  const [step, setStep] = useState<Step>(Step.INFO);

  const handleChangeStep = (nextStep: Step) => {
    setStep(nextStep);
  };

  const form = useForm<PatientSchema>({
    resolver: zodResolver(patientSchema),
  });

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

  useEffect(() => {
    if (form.formState.isSubmitted) {
      form.reset();
    }
  }, [form.formState.isSubmitted]);

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
          {step === Step.INFO && (
            <PatientBasicInfo form={form} handleChangeStep={handleChangeStep} />
          )}
          {step === Step.CONTACT && (<Contact form={form} handleChangeStep={handleChangeStep} />)}
        </DialogPanel>
      </DialogWrapper>
    </DialogContainer>
  );
}
