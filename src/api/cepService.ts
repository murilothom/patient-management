import { CEPResponse } from '../types/CEPResponse';
import { Service } from './service';

const baseURL = 'viacep.com.br/ws';

export class CepService {
  constructor(private service: Service) {}

  public get = async (cep: string): Promise<CEPResponse> => this.service.get(`${baseURL}/${cep}/json`).then((x) => x.data);
}

const service = new Service();
const cepService = new CepService(service);
export default cepService;
