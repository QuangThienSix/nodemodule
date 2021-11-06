import { LoginPayload } from 'features/auth/authSlice';
import { urlLink } from 'helper/route';
import { ListParams, ListResponse, ListResponses, Users } from 'models';
import axiosClient from './axiosClient';

const usersApi = {
  postLogin: (body: LoginPayload): Promise<ListResponses<Users>> => {
    return axiosClient.post(urlLink.auth.sign_in, body);
  },
  postsignup: (body: LoginPayload): Promise<ListResponses<Users>> => {
    return axiosClient.post(urlLink.auth.sign_up, body.currentUser);
  },
  postverify: (body: LoginPayload): Promise<ListResponses<Users>> => {
    return axiosClient.post(urlLink.auth.verify, body);
  },
  getAllUsers(params: ListParams): Promise<ListResponse<Users>> {
    const url = '/users';
    return axiosClient.get(url, { params });
  },
  remove(user_id: string): Promise<any> {
    const url = `/users/${user_id}`;
    return axiosClient.delete(url);
  },
  getById(user_id: string): Promise<Users> {
    const url = `/users/${user_id}`;
    return axiosClient.get(url);
  },
  add(data: Users): Promise<Users> {
    const url = '/users';
    return axiosClient.post(url, data);
  },

  update(data: Partial<Users>): Promise<Users> {
    const url = `/users/${data.user_id}`;
    return axiosClient.patch(url, data);
  },
};

export default usersApi;
