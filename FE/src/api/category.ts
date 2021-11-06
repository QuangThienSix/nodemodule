import { ListResponse } from 'models';
import axiosClient from './axiosClient';

const categoryApi = {
  getAll(): Promise<ListResponse<any>> {
    const url = '/category';
    return axiosClient.get(url);
  },
};

export default categoryApi;
