import {
  ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import { createContext } from 'use-context-selector';
import toast from 'react-hot-toast';
import { Patient } from '../types/patient';
import patientsService from '../services/patients-service';

export interface Params {
  sort: string
  order: string
  query?: string
}

interface PatientContextType {
  patients: Patient[]
  fetchPatients: () => Promise<void>
  setCurrentPatient: (patient: Patient | null) => void
  currentPatient: Patient | null
  handleDeletePatient: () => Promise<void>
  handleParams: (params: Partial<Params>) => void
  isFetchingPatients: boolean
}

export const PatientsContext = createContext({} as PatientContextType);

interface IPatientsProviderProps {
  children: ReactNode
}

export function PatientsProvider({ children }: IPatientsProviderProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isFetchingPatients, setIsFetchingPatients] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [params, setParams] = useState({
    sort: 'createdAt',
    order: 'desc',
    query: '',
  });

  const fetchPatients = useCallback(async () => {
    try {
      setIsFetchingPatients(true);
      const response = await patientsService.get({
        sort: params.sort,
        order: params.order,
        query: params.query || undefined,
      });

      setPatients(response);
    } catch (error) {
      toast.error('Ocorreu um erro ao buscar os pacientes.');
    } finally {
      setIsFetchingPatients(false);
    }
  }, [params]);

  const handleParams = useCallback((newParams: Partial<Params>) => {
    setParams((state) => {
      let order = 'desc';

      if (newParams.sort === state.sort) {
        order = state.order === 'desc' ? 'asc' : 'desc';
      }

      return {
        ...state,
        ...newParams,
        order,
      };
    });
  }, []);

  const handleDeletePatient = useCallback(async () => {
    try {
      if (!selectedPatient) return;
      await patientsService.delete(selectedPatient._id);
      toast.success('Paciente excluído com sucesso.');
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar excluir o paciente.');
    }
  }, [selectedPatient]);

  const setCurrentPatient = useCallback((patient: Patient | null) => {
    setSelectedPatient(patient);
  }, []);

  const contextValue = useMemo(() => ({
    patients,
    fetchPatients,
    handleDeletePatient,
    setCurrentPatient,
    handleParams,
    isFetchingPatients,
    currentPatient: selectedPatient,
  }), [
    patients,
    fetchPatients,
    handleDeletePatient,
    setCurrentPatient,
    handleParams,
    isFetchingPatients,
    selectedPatient,
  ]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients, params]);

  return (
    <PatientsContext.Provider value={contextValue}>
      {children}
    </PatientsContext.Provider>
  );
}
