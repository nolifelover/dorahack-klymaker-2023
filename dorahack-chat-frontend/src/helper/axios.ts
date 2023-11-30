import axios from 'axios';
import { JwtToken } from '../type/auth';

const axiosServices = axios.create();

axiosServices.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default axiosServices;

export const setAxiosAuthorization = (tokens: JwtToken | null) => {
  if (tokens) {
    axiosServices.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`;
  } else {
    delete axiosServices.defaults.headers.common.Authorization;
  }
};
