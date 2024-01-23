import { Patient } from '../../../types/patient';
import { PatientSchema } from './validation-schema';

export const getInitialValues = (patient: Patient | null): PatientSchema => ({
  _id: patient?._id ?? undefined,
  name: patient?.name ?? '',
  nickname: patient?.nickname ?? '',
  document: patient?.document ?? '',
  rg: patient?.rg ?? '',
  email: patient?.email ?? '',
  gender: patient?.gender ?? '',
  maritalStatus: patient?.maritalStatus ?? '',
  dateOfBirth: patient?.dateOfBirth ?? new Date(),
  nationality: patient?.nationality ?? '',
  contact: {
    address: patient?.contact.address ?? '',
    city: patient?.contact.city ?? '',
    complement: patient?.contact.complement ?? '',
    neighborhood: patient?.contact.neighborhood ?? '',
    number: patient?.contact.number ?? '',
    postalCode: patient?.contact.postalCode ?? '',
    uf: patient?.contact.uf ?? '',
  },
});
