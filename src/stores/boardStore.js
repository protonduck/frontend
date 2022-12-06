import { defineStore } from 'pinia';
import apiClient from '@/apiClient';
import storage from '@plugins/storage';

export const useBoardStore = defineStore('boardStore', {
  state: () => {
    return {
      boards: [],
      activeBoardId: storage.getItem('activeBoardId') || '',
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
      if (this.getBoardIndex(data.id) === -1) {
        this.boards.push({});
      }
    },
    async editBoard(data) {
      this.boards[this.getBoardIndex(data.id)] = data;
    },
    async removeBoard(data) {
      this.boards = this.boards.filter((item) => item.id === data.id);
    },
    async setActiveBoard(id) {
      this.activeBoardId = id;
    },
    async clearBoards() {
      this.boards = [];
    },
  },
  getters: {
    getAll: (state) => {
      return state.boards;
    },
    getBoard: (state) => (id) => state.boards.find((item) => item.id === id),
    getBoardIndex: (state) => {
      return (index) => state.boards.findIndex((item) => item.id === index);
    },
    getActiveBoardId(state) {
      return state.activeBoardId;
    },
  },
});
