import { ReactNode, useCallback, useEffect, useState } from "react"
import { createContext } from "use-context-selector"
import { Patient } from "../types/Patient"
import patientsService from "../api/patientsService"
import { toast } from "react-toastify"

interface Params {
  sort?: 'createdAt' | 'name' | 'document' | 'dateOfBirth' | 'email' | 'city'
  order?: 'asc' | 'desc'
  query?: string
}

interface PatientContextType {
  patients: Patient[]
  fetchPatients: () => Promise<void>
  setCurrentPatient: (patient: Patient) => void
  handleDeletePatient: () => Promise<void>
  handleParams: (params: Params) => void
}

export const PatientsContext = createContext({} as PatientContextType);

interface IPatientsProviderProps {
  children: ReactNode
}

export function PatientsProvider({ children }: IPatientsProviderProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient>({} as Patient);
  const [params, setParams] = useState({
    sort: 'createdAt',
    order: 'desc',
    query: ''
  });

  const fetchPatients = useCallback(async () => {
    try {
      const patients = await patientsService
      .get({
        params: {
          sort: params?.sort ?? 'createdAt',
          order: params?.order ?? 'desc',
          query: params?.query,
        },
      })

    setPatients(patients)
    } catch (error) {
      toast.error('Ocorreu um erro ao buscar os pacientes.');
    }
  }, [params]);

  const handleParams = useCallback((params: Params) => {
    setParams(state => ({ ...state, params }));
  }, []);

  const handleDeletePatient = useCallback(async () => {
    try {
      await patientsService.delete(selectedPatient.id);
      toast.success('Paciente excluído com sucesso.');
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar excluir o paciente.');
    }
  }, [selectedPatient])

  const setCurrentPatient = useCallback((patient: Patient) => setSelectedPatient(patient), []);

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients, params]);

  return (
    <PatientsContext.Provider
      value={{
        patients,
        fetchPatients,
        handleDeletePatient,
        setCurrentPatient,
        handleParams
      }}
    >
      {children}
    </PatientsContext.Provider>
  )
}