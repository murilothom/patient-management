import { useRef, useState, useEffect } from "react";
import { Patient } from "../../../../types/Patient";
import { dateFormatter, documentFormatter } from "../../../../utils/formatter";
import { DotsThree } from "phosphor-react";
import { ActionsButtonsWrapper, PatientInfo } from "./styles";
import { DeletePatientModalContext } from "../../../../contexts/DeletePatientModalContext";
import { useContextSelector } from "use-context-selector";

interface Props {
  patient: Patient
}

export function PatientDetail({ patient }: Props) {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const actionsButtonRef = useRef<HTMLButtonElement>(null);
  const {
    onOpen: onOpenDeleteModal,
    setCurrentPatient
  } = useContextSelector(
    DeletePatientModalContext,
    (context) => context
  );

  useEffect(() => {
    const handleClickOutsideButtonActions = (event: MouseEvent) => {
      if (
        actionsButtonRef.current &&
        !actionsButtonRef.current.contains(event.target as Node) &&
        isActionsOpen
      ) {
        setIsActionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideButtonActions);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideButtonActions);
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
        <button ref={actionsButtonRef}>
          <DotsThree
            weight="bold"
            color="#000000"
            size={24}
            onClick={() => setIsActionsOpen(true)}
          />
        </button>
        {isActionsOpen ? (
          <ActionsButtonsWrapper>
            <button ref={actionsButtonRef}>Editar</button>
            <button ref={actionsButtonRef} onClick={handleOpenDeleteModal}>
              Excluir
            </button>
          </ActionsButtonsWrapper>
        ) : null}
      </PatientInfo>
    </tr>
  );
}
