import axios from 'axios';
import { useUserStore } from '@stores/userStore';

let authToken;

if (localStorage.getItem('authToken')) {
  authToken = localStorage.getItem('authToken');
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.request.use(request => {
  if (!authToken) {
    const userStore = useUserStore();
    authToken = userStore.getToken;
  }
  
  request.headers.Authorization = `Bearer ${authToken}`;

  return request;
})

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
