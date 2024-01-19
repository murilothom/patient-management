import { Params } from "../contexts/PatientsContext";
import { Patient } from "../types/Patient";
import { Service } from "./service";

const baseURL = "http://localhost:3000/patients";

export class PatientsService {
  constructor(private service: Service) {}

  public get = async (params: Params): Promise<Patient[]> => {
    return this.service.get(baseURL, { params: {
      _sort: params.sort,
      _order: params.order,
      q: params.query
    } }).then(x => x.data);
  }

  public delete = async (id: string): Promise<void> => {
    return this.service.delete(`${baseURL}/${id}`);
  }
}

const service = new Service();
const patientsService = new PatientsService(service);
export default patientsService;
