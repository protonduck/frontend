import Vue from 'vue';

export default new Vue({
  methods: {
    edit(context, item) {
      this.$emit(context, item);
    },
    fetchBoards() {
      this.$http.get('/boards').then((resp) => {
        const boards = resp.data;

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

        this.edit('board-changed');
      }).catch(() => {
        // do nothing
      });
    },
  },
});
