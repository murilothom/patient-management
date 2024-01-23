import { useEffect, useRef, useState } from 'react';
import { DotsThree } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import { Patient } from '../../../../types/patient';
import { ActionsButtonsWrapper, PatientInfo } from './styles';
import { ModalContext } from '../../../../contexts/modal-context';
import { PatientsContext } from '../../../../contexts/patients-context';
import { useMask } from '../../../../hooks/use-mask';
import { dateFormatter } from '../../../../utils/formatters/date-formatter';

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
  const actionsWrapperRef = useRef<HTMLDivElement>(null);

  const openDeleteModal = () => {
    setCurrentPatient(patient);
    handleOpenDeleteModal();
    setIsActionsOpen(false);
  };

  const openPatientModal = () => {
    setCurrentPatient(patient);
    handleOpenPatientModal();
    setIsActionsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionsWrapperRef.current && !actionsWrapperRef.current.contains(event.target as Element)
      ) {
        setIsActionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [actionsWrapperRef]);

  return (
    <tr>
      <PatientInfo onClick={openPatientModal}>
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
          <ActionsButtonsWrapper ref={actionsWrapperRef}>
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
