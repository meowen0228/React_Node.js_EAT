/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { defaultConfig } from '../utils/env';

axios.defaults.withCredentials = true;

export const get = async (url, param, config) => {
  let result;
  await axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${defaultConfig.api_url}${url}`,
    params: param,
    ...config,
  })
    .then((res) => {
      result = res.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};

export const post = async (url, param, config) => {
  let result;
  await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${defaultConfig.api_url}${url}`,
    data: param,
    ...config,
  })
    .then((res) => {
      result = res.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};

export const put = async (url, param, config) => {
  let result;
  await axios({
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${defaultConfig.api_url}${url}`,
    data: param,
    ...config,
  })
    .then((res) => {
      result = res.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};

export const del = async (url, param, config) => {
  let result;
  await axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${defaultConfig.api_url}${url}`,
    data: param,
    ...config,
  })
    .then((res) => {
      result = res.data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};
