import axios from 'axios';
import { useUserStore } from '@stores/userStore';
import storage from '@plugins/storage';

let authToken;

if (storage.getItem('authToken')) {
  authToken = storage.getItem('authToken');
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

// add auth token to request
apiClient.interceptors.request.use(request => {
  if (!authToken) {
    const userStore = useUserStore();
    authToken = userStore.getToken;
  }
  
  request.headers.Authorization = `Bearer ${authToken}`;

  return request;
})

// logout user when response is 401
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      authToken = null;
      const userStore = useUserStore();
      userStore.logoutUser();
    }

    return Promise.reject(error);
  }
);

export default {
  getBoards() {
    return apiClient.get('/boards');
  },
  loginUser(data) {
    return apiClient.post('/user/login', {
      email: data.email,
      password: data.password,
    });
  }
}
