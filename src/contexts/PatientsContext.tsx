import {
  ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import { createContext } from 'use-context-selector';
import { toast } from 'react-toastify';
import { Patient } from '../types/Patient';
import patientsService from '../api/patientsService';
import { PatientSchema } from '../types/PatientSchema';
import { PatientDto } from '../types/PatientDto';

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
  onSubmit: (data: PatientSchema) => Promise<void>
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

  const onSubmit = useCallback(async (data: PatientSchema) => {
    try {
      const patient: PatientDto = { ...data, dateOfBirth: new Date(data.dateOfBirth) };
      if (selectedPatient !== null) {
        await patientsService.update(selectedPatient._id, patient);
      } else {
        await patientsService.create(patient);
      }
      toast.success('Paciente salvo com sucesso.');
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar salvar os dados do paciente.');
    } finally {
      setSelectedPatient(null);
    }
  }, [selectedPatient]);

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
      toast.error('Ocorreu um erro ao buscar os pacientes.', { theme: 'colored' });
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
      toast.error('Ocorreu um erro ao tentar excluir o paciente.', { theme: 'colored' });
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
    onSubmit,
  }), [
    patients,
    fetchPatients,
    handleDeletePatient,
    setCurrentPatient,
    handleParams,
    isFetchingPatients,
    selectedPatient,
    onSubmit,
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
