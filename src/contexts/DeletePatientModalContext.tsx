import { ReactNode, useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';

interface DeletePatientModalContextType {
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
}

export const DeletePatientModalContext = createContext({} as DeletePatientModalContextType);

interface DeletePatientModalProviderProps {
  children: ReactNode
}

export function DeletePatientModalProvider({ children }: DeletePatientModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const contextValue = useMemo(() => ({
    onOpen,
    onClose,
    isOpen,
  }), [onOpen, onClose, isOpen]);

  return (
    <DeletePatientModalContext.Provider value={contextValue}>
      {children}
    </DeletePatientModalContext.Provider>
  );
}
