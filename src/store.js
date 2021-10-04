import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const authTokenName = 'authToken';

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem(authTokenName) || '',
    user: {},
    show_category_modal: false,
    show_board_modal: false,
    show_link_modal: false,
    active_board_id: 0,
    current_category_id: 0,
    boards: [],
    categories: [],
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token, user) {
      state.status = 'success';
      state.token = token;
      state.user = user;
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
    change_active_board_id(state, payload) {
      state.active_board_id = payload;
    },
    change_current_category_id(state, payload) {
      state.current_category_id = payload;
    },
    updateBoards(state, boards) {
      state.boards = boards;
    },
    updateCategories(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: '/user/login', data: user, method: 'POST' })
          .then((resp) => {
            const token = resp.data.api_key;
            // eslint-disable-next-line no-shadow
            const user = resp.data;
            localStorage.setItem(authTokenName, token);
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            commit('auth_success', token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error');
            localStorage.removeItem(authTokenName);
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: '/user/signup', data: user, method: 'POST' })
          .then((resp) => {
            const token = resp.data.api_key;
            // eslint-disable-next-line no-shadow
            const user = resp.data;
            localStorage.setItem(authTokenName, token);
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            commit('auth_success', token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error', err);
            localStorage.removeItem(authTokenName);
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem(authTokenName);
        delete axios.defaults.headers.common.Authorization;
        resolve();
      });
    },
    boardSave(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: payload.url,
          method: payload.method,
          data: payload,
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    categorySave(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: payload.url,
          method: payload.method,
          data: payload,
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    linkSave(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: payload.api_url,
          method: payload.method,
          data: payload,
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
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
    categories: (state) => state.categories,
  },
});
