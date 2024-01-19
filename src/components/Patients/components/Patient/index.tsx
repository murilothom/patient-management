import { useRef, useState, useEffect } from 'react';
import { DotsThree } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import { Patient } from '../../../../types/Patient';
import { dateFormatter, documentFormatter } from '../../../../utils/formatter';
import { ActionsButtonsWrapper, PatientInfo } from './styles';
import { DeletePatientModalContext } from '../../../../contexts/DeletePatientModalContext';
import { PatientsContext } from '../../../../contexts/PatientsContext';

interface Props {
  patient: Patient
}

export function PatientDetail({ patient }: Props) {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const actionsButtonRef = useRef<HTMLButtonElement>(null);
  const { onOpen: onOpenDeleteModal } = useContextSelector(
    DeletePatientModalContext,
    (context) => context,
  );
  const setCurrentPatient = useContextSelector(
    PatientsContext,
    (context) => context.setCurrentPatient,
  );

  useEffect(() => {
    const handleClickOutsideButtonActions = (event: MouseEvent) => {
      if (
        actionsButtonRef.current
        && !actionsButtonRef.current.contains(event.target as Node)
        && isActionsOpen
      ) {
        setIsActionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideButtonActions);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideButtonActions);
    };
  }, [isActionsOpen]);

  function handleOpenDeleteModal() {
    onOpenDeleteModal();
    setCurrentPatient(patient);
    setIsActionsOpen(false);
  }

  return (
    <tr>
      <PatientInfo>
        <span>{patient.name}</span>
      </PatientInfo>
      <PatientInfo>
        <span>{documentFormatter(patient.document)}</span>
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
        <button aria-label="open-action-buttons" type="button" ref={actionsButtonRef}>
          <DotsThree
            weight="bold"
            color="#000000"
            size={24}
            onClick={() => setIsActionsOpen(true)}
          />
        </button>
        {isActionsOpen ? (
          <ActionsButtonsWrapper>
            <button type="button" ref={actionsButtonRef}>Editar</button>
            <button type="button" ref={actionsButtonRef} onClick={handleOpenDeleteModal}>
              Excluir
            </button>
          </ActionsButtonsWrapper>
        ) : null}
      </PatientInfo>
    </tr>
  );
}
