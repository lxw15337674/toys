import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// https://www.dazhuanlan.com/2020/04/03/5e8632ab86219/
declare module 'axios' {
  export interface AxiosInstance {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}

const service = axios.create({});

export interface ResponseData {
  c: number | string;
  d?: any;
  m: string;
}

service.interceptors.response.use(
  <T = any>(res: AxiosResponse<ResponseData>): Promise<T> => {
    if (res.data.c === '0' || res.data.c === 0) {
      return Promise.resolve(res.data.d);
    }
    return Promise.reject(new Error(res.data.m || '请求失败，请重试'));
  },
  err => Promise.reject(new Error((err && err.response && err.response.statusText) || '服务器错误，请重试'))
);

const instance = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      service
        .get<T>(url, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  post: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      service
        .post<T>(url, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
export default instance;
