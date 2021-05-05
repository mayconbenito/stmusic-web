import axios from 'axios';

import { getSessionData, isLoggedIn } from '../helpers/session';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  if (isLoggedIn()) {
    config.headers = { Authorization: `Bearer ${getSessionData().jwt}` };
  }

  return config;
});

export default api;
