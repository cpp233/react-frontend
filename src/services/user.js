import { post } from '../utils/request';

const USERS_API_V1 = '/api/v1/admin/users';

export const createOneUser = data => {
  return post(USERS_API_V1, data);
};
