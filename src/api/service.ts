import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class Service {
  private axiosInstance = (): AxiosInstance => {
    return axios.create();
  };

  public get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T | any> => {
    return this.axiosInstance().get(url, config);
  };

  public post = async <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T | any> => {
    return this.axiosInstance().post(url, params, config);
  };

  public put = async <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T | any> => {
    return this.axiosInstance().put(url, params, config);
  };

  public delete = async <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T | any> => {
    return this.axiosInstance().delete(url, config);
  };

  public patch = async <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T | any> => {
    return this.axiosInstance().patch(url, params, config);
  };
}
