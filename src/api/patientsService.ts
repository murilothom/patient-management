import { Params } from '../contexts/PatientsContext';
import { PatientSchema } from '../lib/formik/Patient/validationSchema';
import { Patient } from '../types/Patient';
import { Service } from './service';

// const baseURL = 'https://patient-management-api-5mh6.onrender.com/patient'; /* URL Caso API NÃO estiver sendo executada localmente */
const baseURL = 'http://localhost:3000/patient'; /* URL Caso API estiver sendo executada localmente */

export class PatientsService {
  constructor(private service: Service) {}

  public get = (params: Params): Promise<Patient[]> => this.service.get(baseURL, {
    params,
  }).then((x) => x.data);

  public create = (patient: PatientSchema): Promise<Patient> => this.service.post(baseURL, patient);

  public update = (patient: PatientSchema): Promise<Patient> => this.service.put(`${baseURL}/${patient._id}`, patient);

  public save = (patient: PatientSchema): Promise<Patient> => {
    if (patient._id) return this.update(patient);
    return this.create(patient);
  };

  public delete = (id: string): Promise<void> => this.service.delete(`${baseURL}/${id}`);
}

const service = new Service();
const patientsService = new PatientsService(service);
export default patientsService;
