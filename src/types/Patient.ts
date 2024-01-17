import { Contact } from "./Contact";

export interface Patient {
  id: string,
  name: string,
  nickname: string,
  email: string,
  nationality: string,
  dateOfBirth: Date,
  document: string,
  rg: string,
  gender: string,
  maritalStatus: string,
  contact: Contact,
  createdAt: Date,
  updatedAt: Date,
}
