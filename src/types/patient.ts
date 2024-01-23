import { Contact } from './contact';
import { Picture } from './picture';

export interface Patient {
  _id: string,
  name: string,
  nickname: string,
  email: string,
  nationality: string,
  dateOfBirth: Date,
  document: string,
  rg: string,
  gender: string,
  maritalStatus: string,
  additionalObservations?: string,
  contact: Contact,
  picture?: Picture | null
  createdAt: Date,
  updatedAt: Date,
}
