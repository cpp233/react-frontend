import { post } from '../utils/request';

const LOGIN_API_V1 = '/api/v1/admin/login';

export const login = data => {
  return post(LOGIN_API_V1, data);
};
