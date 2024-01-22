import * as Yup from 'yup';

export const patientSchema = Yup.object().shape({
  _id: Yup.string().optional(),
  name: Yup.string().required('Campo obrigatório.').trim(),
  rg: Yup.string().required('Campo obrigatório.').trim(),
  document: Yup.string().required('Campo obrigatório.').trim(),
  nickname: Yup.string().required('Campo obrigatório.').trim(),
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório.').trim(),
  nationality: Yup.string().required('Campo obrigatório.').trim(),
  dateOfBirth: Yup.date().required('Campo obrigatório.'),
  gender: Yup.string().required('Campo obrigatório.').trim(),
  maritalStatus: Yup.string().required('Campo obrigatório.').trim(),
  additionalObservations: Yup.string().optional().trim(),
  contact: Yup.object({
    address: Yup.string().required('Campo obrigatório.').trim(),
    postalCode: Yup.string().required('Campo obrigatório.').trim(),
    complement: Yup.string().trim(),
    city: Yup.string().required('Campo obrigatório.').trim(),
    neighborhood: Yup.string().required('Campo obrigatório.').trim(),
    uf: Yup.string().required('Campo obrigatório.'),
    number: Yup.string().required('Campo obrigatório.').trim(),
  }),
});

export type PatientSchema = Yup.InferType<typeof patientSchema>;
