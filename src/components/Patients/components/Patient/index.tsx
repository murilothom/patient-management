import { useState } from 'react';
import { DotsThree } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import { Patient } from '../../../../types/Patient';
import { dateFormatter } from '../../../../utils/formatter';
import { ActionsButtonsWrapper, PatientInfo } from './styles';
import { ModalContext } from '../../../../contexts/ModalContext';
import { PatientsContext } from '../../../../contexts/PatientsContext';
import { useMask } from '../../../../hooks/useMask';

interface Props {
  patient: Patient
}

export function PatientDetail({ patient }: Props) {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const { handleOpenDeleteModal, handleOpenPatientModal } = useContextSelector(
    ModalContext,
    (context) => context,
  );
  const setCurrentPatient = useContextSelector(
    PatientsContext,
    (context) => context.setCurrentPatient,
  );
  const { maskedValue: maskedDocument } = useMask('cpf', patient.document);

  const openDeleteModal = () => {
    setCurrentPatient(patient);
    setIsActionsOpen(false);
    handleOpenDeleteModal();
  };

  const openPatientModal = () => {
    setCurrentPatient(patient);
    setIsActionsOpen(false);
    handleOpenPatientModal();
  };

  return (
    <tr>
      <PatientInfo>
        <span>{patient.name}</span>
      </PatientInfo>
      <PatientInfo>
        <span>{maskedDocument}</span>
      </PatientInfo>
      <PatientInfo>
        <span>{dateFormatter.format(new Date(patient.dateOfBirth))}</span>
      </PatientInfo>
      <PatientInfo>
        <span>{patient.email}</span>
      </PatientInfo>
      <PatientInfo>
        <span>{patient.contact.city}</span>
      </PatientInfo>
      <PatientInfo>
        <button aria-label="open-action-buttons" type="button">
          <DotsThree
            weight="bold"
            color="#000000"
            size={24}
            onClick={() => setIsActionsOpen(!isActionsOpen)}
          />
        </button>
        {isActionsOpen ? (
          <ActionsButtonsWrapper>
            <button
              type="button"
              onClick={openPatientModal}
            >
              Editar
            </button>
            <button
              type="button"
              onClick={openDeleteModal}
            >
              Excluir
            </button>
          </ActionsButtonsWrapper>
        ) : null}
      </PatientInfo>
    </tr>
  );
}
