import { ReactNode, useState } from "react";
import { createContext } from "use-context-selector";

interface DeletePatientModalContextType {
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
}

export const DeletePatientModalContext = createContext({} as DeletePatientModalContextType);

interface DeletePatientModalProviderProps {
  children: ReactNode
}

export const DeletePatientModalProvider = ({ children }: DeletePatientModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <DeletePatientModalContext.Provider
      value={{ onOpen, onClose, isOpen }}
    >
      {children}
    </DeletePatientModalContext.Provider>
  );
};
