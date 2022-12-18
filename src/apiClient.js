import axios from 'axios';
import { useUserStore } from '@stores/userStore';
import storage from '@plugins/storage';
import env from '@plugins/helper/env';

let authToken;

if (storage.getItem('authToken')) {
  authToken = storage.getItem('authToken');
}

export const apiClient = axios.create({
  baseURL: env.getItem('VITE_API_BASE_URL'),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// add auth token to request
apiClient.interceptors.request.use((request) => {
  if (!authToken) {
    const userStore = useUserStore();
    authToken = userStore.getToken;
  }

  request.headers.Authorization = `Bearer ${authToken}`;

  return request;
});

// logout user when response is 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      authToken = null;
      const userStore = useUserStore();
      userStore.logoutUser();
    }

    return Promise.reject(error);
  }
);

export default {
  loginUser(data) {
    return apiClient.post('/user/login', {
      email: data.email,
      password: data.password,
    });
  },
  registerUser(data) {
    return apiClient.post('/user/signup', {
      name: data.name,
      email: data.email,
      password: data.password,
    });
  },
};
