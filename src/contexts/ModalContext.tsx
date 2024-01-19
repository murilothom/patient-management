import { ReactNode, useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';

interface DeletePatientModalContextType {
  handleOpenDeleteModal: () => void
  handleCloseDeleteModal: () => void
  isDeleteModalOpen: boolean
  handleOpenPatientModal: () => void
  handleClosePatientModal: () => void
  isPatientModalOpen: boolean
}

export const ModalContext = createContext({} as DeletePatientModalContextType);

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleOpenPatientModal = () => setIsPatientModalOpen(true);
  const handleClosePatientModal = () => setIsPatientModalOpen(false);

  const contextValue = useMemo(() => ({
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isDeleteModalOpen,
    handleOpenPatientModal,
    handleClosePatientModal,
    isPatientModalOpen,
  }), [
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isDeleteModalOpen,
    handleOpenPatientModal,
    handleClosePatientModal,
    isPatientModalOpen,
  ]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}
