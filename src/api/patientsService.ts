import { Params } from '../contexts/PatientsContext';
import { Patient } from '../types/Patient';
import { Service } from './service';

const baseURL = 'https://patient-management-api-5mh6.onrender.com/patient';

export class PatientsService {
  constructor(private service: Service) {}

  public get = async (params: Params): Promise<Patient[]> => this.service.get(baseURL, {
    params,
  }).then((x) => x.data);

  public delete = async (id: string): Promise<void> => this.service.delete(`${baseURL}/${id}`);
}

const service = new Service();
const patientsService = new PatientsService(service);
export default patientsService;
