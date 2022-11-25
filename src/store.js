import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const authTokenName = 'authToken';

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem(authTokenName) || '',
    show_category_modal: false,
    show_board_modal: false,
    show_link_modal: false,
    active_board_id: 0,
    current_category_id: 0,
    boards: []
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token) {
      state.status = 'success';
      state.token = token;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
    },
    toggle_category_modal(state, payload) {
      state.show_category_modal = payload;
    },
    toggle_board_modal(state, payload) {
      state.show_board_modal = payload;
    },
    toggle_link_modal(state, payload) {
      state.show_link_modal = payload;
    },
    changeActiveBoardId(state, payload) {
      // remove old value
      localStorage.removeItem('active_board_id');

      // save the new value
      localStorage.setItem('active_board_id', payload);

      // update state
      state.active_board_id = payload;
    },
    change_current_category_id(state, payload) {
      state.current_category_id = payload;
    },
    updateBoards(state, boards) {
      state.boards = boards;
    },
    updateCategories(state, payload) {
      let boardIndex = (index) => state.boards.findIndex((board) => board.id === index);
      state.boards[boardIndex(payload.id)].categories = payload.categories;
    }
  },
  actions: {
    auth(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: payload.url,
          data: payload.data,
          method: 'POST'
        })
          .then((resp) => {
            const token = resp.data.api_key;
            localStorage.setItem(authTokenName, token);
            context.commit('auth_success', token);
            resolve(resp);
          })
          .catch((err) => {
            context.commit('auth_error');
            localStorage.removeItem(authTokenName);
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem(authTokenName);
        resolve();
      });
    },
    save(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: payload.api_url,
          method: payload.method,
          data: payload.data
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    showCategoryModal: (state) => state.show_category_modal,
    showBoardModal: (state) => state.show_board_modal,
    showLinkModal: (state) => state.show_link_modal,
    activeBoardId: (state) => state.active_board_id,
    currentCategoryId: (state) => state.current_category_id,
    boards: (state) => state.boards,
    categories: (state) => {
      if (state.boards[state.active_board_id]) {
        let boardIndex = (index) => state.boards.findIndex((board) => board.id === index);
        return state.boards[boardIndex(state.active_board_id)].categories;
      }
    }
  }
});
