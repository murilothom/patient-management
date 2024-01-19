import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { Patient } from "../types/Patient";
import { toast } from 'react-toastify';
import patientsService from "../api/patientsService";

interface DeletePatientModalContextType {
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
  setCurrentPatient: (patient: Patient) => void;
  handleDeletePatient: () => Promise<void>
}

export const DeletePatientModalContext = createContext({} as DeletePatientModalContextType);

interface DeletePatientModalProviderProps {
  children: ReactNode
}

export const DeletePatientModalProvider = ({ children }: DeletePatientModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [patient, setPatient] = useState<Patient>({} as Patient);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const setCurrentPatient = useCallback((patient: Patient) => setPatient(patient), []);

  const handleDeletePatient = useCallback(async () => {
    try {
      await patientsService.delete(patient.id);
      toast.success('Paciente excluído com sucesso.');
      onClose();
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar excluir o paciente.');
    }
  }, [patient]);

  useEffect(() => {
    if (!isOpen) setCurrentPatient({} as Patient);
  }, [isOpen, setCurrentPatient])

  return (
    <DeletePatientModalContext.Provider
      value={{ onOpen, onClose, isOpen, setCurrentPatient, handleDeletePatient }}
    >
      {children}
    </DeletePatientModalContext.Provider>
  );
};
