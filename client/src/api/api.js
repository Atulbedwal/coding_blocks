import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Auth token set:', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    console.log('Auth token removed');
  }
};

export { api, setAuthToken };
