import axios from 'axios';
import { getUser } from './auth';

const instance = axios.create({
  // baseURL: '127.0.0.1:3001/',
  timeout: 5000,
});

// 拦截处理加上 token
instance.interceptors.request.use(
  config => {
    const user = getUser();
    const token = user ? user.token : null;
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  },
  error => {
    return Promise.reject(error.response);
  }
);
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error.response);
  }
);

export const get = (url, params) => {
  return instance.get(url, {
    params,
  });
};

export const post = (url, data) => {
  return instance.post(url, data);
};

export const put = (url, data) => {
  return instance.put(url, data);
};

export const del = url => {
  return instance.delete(url);
};
