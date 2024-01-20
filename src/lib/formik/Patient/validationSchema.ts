import * as Yup from 'yup';

export const patientSchema = Yup.object().shape({
  _id: Yup.string().optional(),
  name: Yup.string().trim(),
  rg: Yup.string().trim(),
  document: Yup.string().length(11).trim(),
  nickname: Yup.string().trim(),
  email: Yup.string().trim(),
  nationality: Yup.string().trim(),
  dateOfBirth: Yup.date(),
  gender: Yup.string().trim(),
  maritalStatus: Yup.string().trim(),
  additionalObservations: Yup.string().optional(),
  contact: Yup.object({
    address: Yup.string().trim(),
    postalCode: Yup.string().length(8).trim(),
    complement: Yup.string().trim(),
    city: Yup.string().trim(),
    neighborhood: Yup.string().trim(),
    uf: Yup.string(),
    number: Yup.string().trim(),
  }),
});

export type PatientSchema = Yup.InferType<typeof patientSchema>;
