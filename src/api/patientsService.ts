import { Patient } from "../types/Patient";
import { Service } from "./service";

const baseURL = "http://localhost:3000/patients";

export class PatientsService {
  constructor(private service: Service) {}

  public get = async (): Promise<Patient[]> => {
    return this.service.get(baseURL).then(x => x.data);
  }
}

const service = new Service();
const patientsService = new PatientsService(service);
export default patientsService;
