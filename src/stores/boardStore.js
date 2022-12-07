import { defineStore } from 'pinia';
import apiClient from '@/apiClient';
import storage from '@plugins/storage';

export const useBoardStore = defineStore('boardStore', {
  state: () => {
    return {
      boards: [],
      activeBoardId: storage.getItem('activeBoardId') || null,
    };
  },
  actions: {
    async fetchBoards() {
      let response = await apiClient.getBoards();

      if (response.status === 200 && response.data) {
        this.boards = response.data;
      }
    },
    async addBoard(data) {
      if (!data) return;

      this.boards.push(data);
    },
    async editBoard(data) {
      if (!data.id || !data.payload) return;

      const index = this.findIndexById(id);

      if (index !== -1) {
        this.boards[index] = data;
      }
    },
    async removeBoard(id) {
      this.boards = this.boards.filter((item) => item.id !== id);
      this.clearActiveBoard();
    },
    async setActiveBoard(id) {
      this.activeBoardId = id;
      storage.setItem('selectedBoardId', id);
    },
    async clearActiveBoard() {
      this.activeBoardId = null;
      storage.removeItem('selectedBoardId');
    },
    async clearBoards() {
      this.boards = [];
    },
    findIndexById(id) {
      return this.items.findIndex((item) => item.id === id);
    },
  },
  getters: {
    getAll: (state) => {
      return state.boards;
    },
    getBoard: (state) => (id) => state.boards.find((item) => item.id === id),
    getActiveBoardId(state) {
      return state.activeBoardId;
    },
  },
});
