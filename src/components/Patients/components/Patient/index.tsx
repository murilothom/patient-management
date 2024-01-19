import { useRef, useState, useEffect } from "react";
import { Patient } from "../../../../types/Patient";
import { dateFormatter, documentFormatter } from "../../../../utils/formatter";
import { DotsThree } from "phosphor-react";
import { ActionsButtonsWrapper, PatientInfo } from "./styles";

interface Props {
  patient: Patient
}

export function PatientDetail({ patient }: Props) {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const actionsButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutsideButtonActions = (event: MouseEvent) => {
      if (
        actionsButtonRef.current &&
        !actionsButtonRef.current.contains(event.target as Node)
      ) {
        setIsActionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideButtonActions);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideButtonActions);
    };
  }, []);

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
            onClick={() => setIsActionsOpen(state => !state)}
          />
        </button>
        {isActionsOpen ? (
          <ActionsButtonsWrapper>
            <button>Editar</button>
            <button>Excluir</button>
          </ActionsButtonsWrapper>
        ) : null}
      </PatientInfo>
    </tr>
  );
}
