import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { urlLink } from 'helper/route';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: urlLink.api.serverUrl,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (parems) => queryString.stringify(parems),
});

// axiosClient.interceptors.request.use(async (config) => {
//   // set token in headers
//   const token = 'abc';
//   config.headers.Authorization = `Bearer ${token}`;
// });

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response);
  }
);

export default axiosClient;
