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
          let activeBoard;

          if (boards.length) {
            activeBoard = boards[0];
          }

          // look in storage, for active board
          if (localStorage.getItem('active_board_id') !== null && localStorage.getItem('active_board_id') !== 'NaN') {
            activeBoard = _.find(boards, { id: parseInt(localStorage.getItem('active_board_id'), 10) });
          }

          // set active board id
          this.$store.commit('changeActiveBoardId', activeBoard.id);

          // update boards list state
          this.$store.commit('updateBoards', boards);

          // set active board category
          this.$store.commit('updateCategories', {
            id: activeBoard.id,
            categories: activeBoard.categories
          });

          // update background image
          document.body.style.backgroundImage = `url('${activeBoard.image}')`;
        })
        .catch(() => {
          // do nothing
        });
    }
  }
});
