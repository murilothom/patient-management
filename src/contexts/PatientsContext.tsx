import {
  ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import { createContext } from 'use-context-selector';
import { toast } from 'react-toastify';
import { Patient } from '../types/Patient';
import patientsService from '../api/patientsService';

export interface Params {
  sort?: string
  order?: string
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
    query: '',
  });

  const fetchPatients = useCallback(async () => {
    try {
      const response = await patientsService.get({
        sort: params.sort,
        order: params.order,
        query: params.query,
      });

      setPatients(response);
    } catch (error) {
      toast.error('Ocorreu um erro ao buscar os pacientes.', { theme: 'colored' });
    }
  }, [params]);

  const handleParams = useCallback((newParams: Params) => {
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
      await patientsService.delete(selectedPatient.id);
      toast.success('Paciente excluído com sucesso.');
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar excluir o paciente.', { theme: 'colored' });
    }
  }, [selectedPatient]);

  const setCurrentPatient = useCallback((patient: Patient) => setSelectedPatient(patient), []);

  const contextValue = useMemo(() => ({
    patients,
    fetchPatients,
    handleDeletePatient,
    setCurrentPatient,
    handleParams,
  }), [patients, fetchPatients, handleDeletePatient, setCurrentPatient, handleParams]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients, params]);

  return (
    <PatientsContext.Provider value={contextValue}>
      {children}
    </PatientsContext.Provider>
  );
}
