import { Patient } from './Patient';

export type PatientDto = Omit<Patient, '_id' | 'createdAt' | 'updatedAt'>;
