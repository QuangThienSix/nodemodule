import { ListParams, ListResponse, Product } from 'models';
import axiosClient from './axiosClient';

const usersApi = {
  getProduct(params: ListParams): Promise<ListResponse<Product>> {
    const url = '/product';
    return axiosClient.get(url, { params });
  },
  getProductID(id: string): Promise<ListResponse<Product>> {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
  getProductTop5Rating(params: ListParams): Promise<ListResponse<Product>> {
    const url = '/product/top5-ratting';
    return axiosClient.get(url, { params });
  },
  getProductTop5Price(params: ListParams): Promise<ListResponse<Product>> {
    const url = '/product/top5-price';
    return axiosClient.get(url, { params });
  },
  getProductTop5Comments(params: ListParams): Promise<ListResponse<Product>> {
    const url = '/product/top5-recomment';
    return axiosClient.get(url, { params });
  },
  getProductTop5Active(params: ListParams): Promise<ListResponse<Product>> {
    const url = '/product/top5-active';
    return axiosClient.get(url, { params });
  },
};

export default usersApi;
