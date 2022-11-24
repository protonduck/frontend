import Vue from 'vue';

export default new Vue({
  methods: {
    edit(context, item) {
      this.$emit(context, item);
    },
    fetchBoards() {
      this.$http
        .get('/boards')
        .then((resp) => {
          const boards = resp.data;
          let activeBoardId;

          if (boards.length) {
            activeBoardId = boards[0].id;
          }

          if (localStorage.getItem('active_board_id') !== null && localStorage.getItem('active_board_id') !== 'NaN') {
            activeBoardId = parseInt(localStorage.getItem('active_board_id'), 10);
          }

          this.$store.commit('change_active_board_id', activeBoardId);
          localStorage.setItem('active_board_id', activeBoardId);

          this.$store.commit('updateBoards', boards);

          this.edit('board-changed');
        })
        .catch(() => {
          // do nothing
        });
    }
  }
});
