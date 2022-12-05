import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: JSON.parse(localStorage.getItem('user')) || null,
      token: localStorage.getItem('authToken') || null,
    }
  },
  actions: {
    async logoutUser() {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
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
