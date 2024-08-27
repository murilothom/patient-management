import { Params } from '../contexts/patients-context';
import { PatientSchema } from '../lib/formik/patient/validation-schema';
import { Patient } from '../types/patient';
import { Service } from './service';

// const baseURL = 'https://patient-management-api-5mh6.onrender.com/patient'; /* URL Caso API NÃO estiver sendo executada localmente */
const baseURL = 'http://localhost:3001/patient'; /* URL Caso API estiver sendo executada localmente */

export class PatientsService {
  constructor(private service: Service) {}

  public get = (params: Params): Promise<Patient[]> => this.service.get(baseURL, {
    params,
  }).then((x) => x.data);

  public create = (patient: PatientSchema): Promise<Patient> => {
    return this.service.post(baseURL, patient).then((x) => x.data);
  };

  public update = (patient: PatientSchema): Promise<Patient> => {
    return this.service.put(`${baseURL}/${patient._id}`, patient).then((x) => x.data);
  };

  public save = (patient: PatientSchema): Promise<Patient> => {
    if (patient._id) return this.update(patient);
    return this.create(patient);
  };

  public delete = (id: string): Promise<void> => {
    return this.service.delete(`${baseURL}/${id}`);
  };

  public uploadImage = (id: string, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);
    return this.service.patch(`${baseURL}/${id}/picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  public deleteImage = (id: string): Promise<void> => {
    return this.service.delete(`${baseURL}/${id}/picture`);
  };
}

const service = new Service();
const patientsService = new PatientsService(service);
export default patientsService;
