import { defineStore } from 'pinia';
import { apiClient } from '@/apiClient';
import storage from '@plugins/storage';

export const useBoardStore = defineStore('boardStore', {
  state: () => ({
    boards: [],
    errors: [],
    activeBoardId: storage.getItem('activeBoardId') || null,
    isLoading: false,
  }),
  actions: {
    async fetchBoards() {
      this.isLoading = true;

      await apiClient
        .get('/boards')
        .then((response) => {
          this.boards = response.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = {
            status: err.response.data.status,
            message: err.response.data.message,
          };
        });
    },
    async addBoard(board) {
      await apiClient
        .post('/boards', {
          name: board.name,
        })
        .then((response) => {
          this.boards.push(response.data);
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = {
            status: err.response.data.status,
            message: err.response.data.message,
          };
        });
    },
    async editBoard(board) {
      await apiClient
        .put(`/boards/${board.id}`, {
          name: board.name,
        })
        .then((response) => {
          const index = this.findIndexById(board.id);

          if (index !== -1) {
            this.boards[index] = response.data;
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = {
            status: err.response.data.status,
            message: err.response.data.message,
          };
        });
    },
    async removeBoard(id) {
      await apiClient
        .delete(`/boards/${id}`)
        .then(() => {
          this.boards = this.boards.filter((board) => board.id !== id);
          this.clearActiveBoard();
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = {
            status: err.response.data.status,
            message: err.response.data.message,
          };
        });
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
