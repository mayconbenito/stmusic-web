import axios from 'axios';

import session from './session';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  if (session()) {
    config.headers = { Authorization: `Bearer ${session().jwt}` };
  }

  return config;
});

export default api;
