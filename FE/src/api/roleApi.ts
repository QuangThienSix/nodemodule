import { Role, ListResponse } from 'models';
import axiosClient from './axiosClient';

const roleApi = {
  getAll(): Promise<ListResponse<Role>> {
    const url = '/user_roles';
    return axiosClient.get(url, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
  },
};

export default roleApi;
