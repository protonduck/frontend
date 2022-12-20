import { defineStore } from 'pinia';
import { apiClient } from '@/apiClient';
import storage from '@plugins/storage';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: storage.getItem('user', true) || null,
      token: storage.getItem('authToken') || null,
      errors: [],
      isLoading: false,
    };
  },
  actions: {
    async loginUser(user) {
      this.isLoading = true;

      await apiClient
        .post('/user/login', {
          email: user.email,
          password: user.password,
        })
        .then((response) => {
          this.errors = [];
          this.user = response.data;
          this.token = response.data.api_key;

          storage.setItem('user', response.data, true);
          storage.setItem('authToken', response.data.api_key);

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = err.response.data;
        });
    },
    async registerUser(user) {
      this.isLoading = true;

      await apiClient
        .post('/user/signup', {
          name: user.name,
          email: user.email,
          password: user.password,
        })
        .then((response) => {
          this.errors = [];
          this.user = response.data;
          this.token = response.data.api_key;

          storage.setItem('user', response.data, true);
          storage.setItem('authToken', response.data.api_key);

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = err.response.data;
        });
    },
    async logoutUser() {
      storage.removeItem('user');
      storage.removeItem('authToken');
      location.reload();
    },
    async setUser(user) {
      this.user = user;
    },
    async setToken(token) {
      this.token = token;
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getToken: (state) => {
      return state.token;
    },
    isLoggedIn: (state) => {
      return !!state.token;
    },
  },
});
