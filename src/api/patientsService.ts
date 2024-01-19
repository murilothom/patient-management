import { Params } from '../contexts/PatientsContext';
import { Patient } from '../types/Patient';
import { PatientDto } from '../types/PatientDto';
import { Service } from './service';

const baseURL = 'https://patient-management-api-5mh6.onrender.com/patient';

export class PatientsService {
  constructor(private service: Service) {}

  public get = (params: Params): Promise<Patient[]> => this.service.get(baseURL, {
    params,
  }).then((x) => x.data);

  public create = (patient: PatientDto): Promise<Patient> => this.service.post(baseURL, patient);

  public delete = (id: string): Promise<void> => this.service.delete(`${baseURL}/${id}`);

  public update = (id: string, patient: PatientDto): Promise<Patient> => this.service.put(`${baseURL}/${id}`, patient);
}

const service = new Service();
const patientsService = new PatientsService(service);
export default patientsService;
