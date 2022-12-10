import { defineStore } from 'pinia';
import apiClient from '@/apiClient';
import storage from '@plugins/storage';

export const useBoardStore = defineStore('boardStore', {
  state: () => ({
    boards: [],
    activeBoardId: storage.getItem('activeBoardId') || null,
    isLoading: false,
  }),
  actions: {
    async fetchBoards() {
      this.isLoading = true;

      await apiClient
        .getBoards()
        .then((response) => {
          this.boards = response.data;
          this.isLoading = false;

          return response;
        })
        .catch((err) => {
          this.isLoading = false;

          return err.response.data;
        });
    },
    async addBoard(board) {
      this.boards.push(board);
    },
    async editBoard(board) {
      const index = this.findIndexById(board.id);

      if (index !== -1) {
        this.boards[index] = board;
      }
    },
    async removeBoard(id) {
      this.boards = this.boards.filter((board) => board.id !== id);
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
      return this.boards.findIndex((board) => board.id === id);
    },
  },
  getters: {
    getBoardById: (state) => {
      return (id) => state.boards.find((board) => board.id === id);
    },
    getActiveBoardId: (state) => {
      return state.activeBoardId;
    },
  },
});
