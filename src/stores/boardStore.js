import { defineStore } from 'pinia';
import { apiClient } from '@/apiClient';
import storage from '@plugins/storage';

export const useBoardStore = defineStore('boardStore', {
  state: () => ({
    boards: [],
    errors: [],
    activeBoardId: storage.getItem('activeBoardId') || null,
    activeCategoryId: null,
    activeLinkId: null,
    isLoading: false,
  }),
  // Boards
  actions: {
    async fetchBoards() {
      this.isLoading = true;

      await apiClient
        .get('/boards')
        .then((response) => {
          this.errors = [];
          this.boards = response.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = err.response.data;
        });
    },
    async addBoard(board) {
      await apiClient
        .post('/boards', {
          name: board.name,
        })
        .then((response) => {
          this.errors = [];
          this.boards.push(response.data);
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = err.response.data;
        });
    },
    async editBoard(board) {
      await apiClient
        .put(`/boards/${board.id}`, {
          name: board.name,
        })
        .then((response) => {
          this.errors = [];

          const index = this.findIndexById(board.id);

          if (index !== -1) {
            this.boards[index] = response.data;
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = err.response.data;
        });
    },
    async removeBoard(id) {
      await apiClient
        .delete(`/boards/${id}`)
        .then(() => {
          this.errors = [];
          this.boards = this.boards.filter((board) => board.id !== id);
          this.clearActiveBoard();
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = err.response.data;
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
    // Category
    async addCategory(category) {
      await apiClient
        .post('/categories', {
          board_id: category.board_id,
          name: category.name,
          description: category.description,
        })
        .then((response) => {
          this.errors = [];

          const boardIndex = this.findIndexById(category.board_id);

          if (boardIndex !== -1) {
            this.boards[boardIndex].categories.push(response.data);
          }

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = err.response.data;
        });
    },
    async editCategory(category) {
      await apiClient
        .put(`/categories/${category.id}`, {
          name: category.name,
          description: category.description,
        })
        .then((response) => {
          this.errors = [];

          const boardIndex = this.findIndexById(category.board_id);

          if (boardIndex !== -1) {
            let categoryIndex = this.boards[boardIndex].categories.findIndex((item) => item.id === category.id);

            if (categoryIndex !== -1) {
              this.boards[boardIndex].categories[categoryIndex] = response.data;
            }
          }

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = err.response.data;
        });
    },
    async removeCategory(category) {
      await apiClient
        .delete(`/categories/${category.id}`)
        .then(() => {
          this.errors = [];

          const boardIndex = this.findIndexById(category.board_id);

          if (boardIndex !== -1) {
            this.boards[boardIndex].categories = this.boards[boardIndex].categories.filter(
              (item) => item.id !== category.id
            );
          }

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = err.response.data;
        });
    },
    // Links
    async addLink(link) {
      await apiClient
        .post('/links', {
          category_id: link.category_id,
          title: link.title,
          url: link.url,
          description: link.description,
        })
        .then((response) => {
          this.errors = [];

          const boardIndex = this.findIndexById(link.board_id);

          if (boardIndex !== -1) {
            let categoryIndex = this.boards[boardIndex].categories.findIndex((item) => item.id === link.category_id);

            if (categoryIndex !== -1) {
              this.boards[boardIndex].categories[categoryIndex].links.push(response.data);
            }
          }

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = err.response.data;
        });
    },
    async editLink(link) {
      await apiClient
        .put(`/links/${link.id}`, {
          category_id: link.category_id,
          title: link.title,
          url: link.url,
          description: link.description,
        })
        .then((response) => {
          this.errors = [];

          const boardIndex = this.findIndexById(link.board_id);

          if (boardIndex !== -1) {
            let categoryIndex = this.boards[boardIndex].categories.findIndex((item) => item.id === link.category_id);

            if (categoryIndex !== -1) {
              let linkIndex = this.boards[boardIndex].categories[categoryIndex].links.findIndex(
                (item) => item.id === link.id
              );

              if (linkIndex !== -1) {
                this.boards[boardIndex].categories[categoryIndex].links[linkIndex] = response.data;
              }
            }
          }

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = err.response.data;
        });
    },
    async removeLink(link) {
      await apiClient
        .delete(`/links/${link.id}`)
        .then(() => {
          this.errors = [];

          const boardIndex = this.findIndexById(link.board_id);

          if (boardIndex !== -1) {
            let categoryIndex = this.boards[boardIndex].categories.findIndex((item) => item.id === link.category_id);

            if (categoryIndex !== -1) {
              let linkIndex = this.boards[boardIndex].categories[categoryIndex].links.findIndex(
                (item) => item.id === link.id
              );

              if (linkIndex !== -1) {
                this.boards[boardIndex].categories[categoryIndex].links = this.boards[boardIndex].categories[
                  categoryIndex
                ].links.filter((item) => item.id !== link.id);
              }
            }
          }

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.errors = err.response.data;
        });
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
