export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListResponses<T> {
  data: T;
  message: string;
}
export interface ListRespon<T> {
  data: T;
}

export interface ListParams {
  _limit?: number;
  _page?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  [key: string]: any;
}
