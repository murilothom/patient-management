import { useEffect, useRef, useState } from 'react';
import { DotsThree } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import { Patient } from '../../../../types/patient';
import {
  ActionsButtonsWrapper, InfoContent, InfoWrapper, PatientContainer, PatientImage,
} from './styles';
import { ModalContext } from '../../../../contexts/modal-context';
import { PatientsContext } from '../../../../contexts/patients-context';
import { useMask } from '../../../../hooks/use-mask';
import { dateFormatter } from '../../../../utils/formatters/date-formatter';
import userImg from '../../../../assets/image-user.png';

interface Props {
  patient: Patient
}

export function PatientListDetail({ patient }: Props) {
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
        actionsWrapperRef.current
        && !actionsWrapperRef.current.contains(event.target as Element)
        && isActionsOpen
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
    <PatientContainer>
      <InfoWrapper>
        <PatientImage src={patient.picture?.base64 || userImg} alt="Imagem do paciente" />

        <InfoContent>
          <strong>Nome:</strong>
          <span>{patient.name}</span>
        </InfoContent>
      </InfoWrapper>
      <InfoWrapper style={{ marginLeft: '3.5rem', gap: '1.5rem' }}>
        <InfoContent>
          <strong>Data de nascimento:</strong>
          <span>{dateFormatter.format(new Date(patient.dateOfBirth))}</span>
        </InfoContent>
        <InfoContent>
          <strong>CPF:</strong>
          <span>{maskedDocument}</span>
        </InfoContent>
      </InfoWrapper>

      <button aria-label="open-action-buttons" type="button">
        <DotsThree
          weight="bold"
          color="#000000"
          size={24}
          onClick={() => setIsActionsOpen(!isActionsOpen)}
        />
      </button>
      {isActionsOpen && (
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
      )}
    </PatientContainer>
  );
}
