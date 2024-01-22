import { useState } from 'react';
import { X } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import {
  CloseButton,
  DialogContainer,
  DialogWrapper,
  DialogPanel,
  NavBar,
  NavBarButton,
} from './styles';
import { ModalContext } from '../../contexts/modal-context';
import { PatientsContext } from '../../contexts/patients-context';
import { PatientBasicInfo } from './components/PatientBasicInfo';
import { Contact } from './components/contact';
import { getInitialValues } from '../../lib/formik/patient/initial-values';
import { PatientSchema, patientSchema } from '../../lib/formik/patient/validation-schema';
import patientsService from '../../services/patients-service';

enum Step {
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
    currentPatient,
    fetchPatients,
  } = useContextSelector(
    PatientsContext,
    (context) => context,
  );

  const onClose = () => {
    setCurrentPatient(null);
    handleClosePatientModal();
  };

  const onSubmit = async (model: PatientSchema) => {
    try {
      await patientsService.save(model);
      toast.success('Paciente salvo com sucesso.');
      handleChangeStep(Step.INFO);
      fetchPatients();
      setCurrentPatient(null);
      handleClosePatientModal();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response?.data?.message === 'Patient already created') {
        toast.error('E-mail, CPF ou RG já cadastrados.');
        return;
      }
      if (error.response?.data?.message === 'Invalid CPF') {
        toast.error('CPF inválido.');
        return;
      }
      toast.error('Ocorreu um erro ao tentar salvar os dados do paciente.');
    }
  };

  return (
    <DialogContainer open={isPatientModalOpen} onClose={() => {}}>
      <Formik
        initialValues={getInitialValues(currentPatient)}
        onSubmit={onSubmit}
        validationSchema={patientSchema}
      >
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
            <PatientBasicInfo handleChangeStep={handleChangeStep} />
            )}
            {step === Step.CONTACT && (<Contact />)}
          </DialogPanel>
        </DialogWrapper>
      </Formik>
    </DialogContainer>
  );
}
