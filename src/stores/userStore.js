import { defineStore } from "pinia";
import { useBoardStore } from "@stores/boardStore";

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: JSON.parse(localStorage.getItem('user')) || [],
      token: localStorage.getItem('authToken') || '',
    }
  },
  actions: {
    async logoutUser() {
      this.user = [];
      this.token = '';
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');

      const boardStore = useBoardStore();
      boardStore.clearBoards();
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
