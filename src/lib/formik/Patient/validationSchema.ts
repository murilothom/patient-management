import * as Yup from 'yup';

export const patientSchema = Yup.object().shape({
  _id: Yup.string().optional(),
  name: Yup.string().required().trim(),
  rg: Yup.string().required().trim(),
  document: Yup.string().length(11).required().trim(),
  nickname: Yup.string().required().trim(),
  email: Yup.string().required().trim(),
  nationality: Yup.string().required().trim(),
  dateOfBirth: Yup.date(),
  gender: Yup.string().required().trim(),
  maritalStatus: Yup.string().required().trim(),
  additionalObservations: Yup.string().optional().trim(),
  contact: Yup.object({
    address: Yup.string().required().trim(),
    postalCode: Yup.string().length(8).required().trim(),
    complement: Yup.string().required().trim(),
    city: Yup.string().required().trim(),
    neighborhood: Yup.string().required().trim(),
    uf: Yup.string(),
    number: Yup.string().required().trim(),
  }),
});

export type PatientSchema = Yup.InferType<typeof patientSchema>;
