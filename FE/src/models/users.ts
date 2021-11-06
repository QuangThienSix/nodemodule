export interface Users {
  user_id?: string;
  username: string;
  password: string;
  fullname?: string;
  address?: string;
  email?: string;
  accessToken: string;
  tokenMail?: string;
  ratting?: number;
  refreshToken: string;
  islock: boolean;
  roles_id: number | string;
}
