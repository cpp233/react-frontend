import { get, post, put, del } from '../utils/request';

const ITEMS_API_V1 = '/api/v1/admin/items';

export const getList = ({ page = 1, per = 10 }) => {
  return get(ITEMS_API_V1, { page, per });
};

export const getOneById = id => {
  return get(`${ITEMS_API_V1}/${id}`);
};

export const createOne = data => {
  return post(ITEMS_API_V1, data);
};

export const modifyOneById = (id, data) => {
  return put(`${ITEMS_API_V1}/${id}`, data);
};

export const delOneById = id => {
  return del(`${ITEMS_API_V1}/${id}`);
};
