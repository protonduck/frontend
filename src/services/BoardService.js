import Vue from 'vue';
import _ from 'lodash';

export default new Vue({
  methods: {
    fetchBoards() {
      this.$http.get('/boards').then((resp) => {
        this.setBoards(resp.data);
      }).catch(() => {
        // do nothing
      });
    },
    setBoards(boards) {
      if (localStorage.getItem('active_board_id') === null) {
        if (!this.$store.getters.activeBoardId && boards.length) {
          this.$store.commit('change_active_board_id', boards[0].id);
        }
      } else {
        boards.forEach((board) => {
          // eslint-disable-next-line radix
          if (board.id === parseInt(localStorage.getItem('active_board_id'))) {
            this.$store.commit('change_active_board_id', board.id);
          }
        });
      }

      this.$store.commit('updateBoards', boards);

      this.$emit('boardsChanged');
    },
    getActiveBoard() {
      return _.find(this.$store.getters.boards, { id: this.$store.getters.activeBoardId });
    },
    edit(item) {
      this.$emit('edit', item);
    },
  },
});
