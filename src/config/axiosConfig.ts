import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default axios;

export const sendAxiosRequest = async <R = undefined, T = undefined>(input: {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    url: string;
    data?: T;
    config?: AxiosRequestConfig<T>;
}) => {
    const { method, url, config, data } = input;

    if (method === 'get') return axios.get<T, AxiosResponse<R>>(url, config);
    return axios[method]<T, AxiosResponse<R>>(url, data, config);
};
