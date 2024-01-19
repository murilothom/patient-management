import * as z from 'zod';

export const patientSchema = z.object({
  name: z.string().trim(),
  rg: z.string().trim(),
  document: z.string().length(11).trim(),
  nickname: z.string().trim(),
  email: z.string().trim(),
  nationality: z.string().trim(),
  dateOfBirth: z.string(),
  gender: z.string().trim(),
  maritalStatus: z.string().trim(),
  additionalObservations: z.string().optional(),
  contact: z.object({
    address: z.string().trim(),
    postalCode: z.string().length(8).trim(),
    complement: z.string().trim(),
    city: z.string().trim(),
    neighborhood: z.string().trim(),
    uf: z.string(),
    number: z.string().trim(),
  }),
});

export type PatientSchema = z.infer<typeof patientSchema>;
