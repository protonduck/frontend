import { defineStore } from 'pinia';
import storage from '@plugins/storage';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: storage.getItem('user', true) || null,
      token: storage.getItem('authToken') || null,
    };
  },
  actions: {
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
