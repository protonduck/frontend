<template>
  <div>
    <div class="boards mb-3">
      <nav>
        <div class="d-flex">
          <draggable v-model="boards" class="nav nav-pills" group="boards" @change="update()">
            <a v-for="(board) in boards" :key="board.id"
               class="nav-item nav-link"
               href="#" v-bind:class="{active: board.id === $store.getters.activeBoardId}"
               @click.prevent="switchBoard(board.id)"
            >
              {{ board.name }}
            </a>
          </draggable>

          <div class="nav nav-pills">
            <a
              class="nav-item nav-link"
              href="#"
              @click.prevent="$store.commit('toggle_board_modal', true)"
            >
              <i class="fa fa-plus"></i>
            </a>

            <a class="nav-item nav-link" href="#" @click.prevent="edit" v-if="boards.length">
              <i class="fa fa-edit"></i>
            </a>
          </div>
        </div>
      </nav>
    </div>

    <modal v-if="$store.getters.showBoardModal">
      <div slot="content">
        <board-form />
      </div>
    </modal>

    <categories-list />
  </div>
</template>

<script>
import _ from 'lodash';
import draggable from 'vuedraggable';
import BoardService from '../../services/BoardService';
import CategoriesList from '../category/List.vue';
import Modal from '../../components/misc/Modal.vue';
import BoardForm from './Form.vue';

export default {
  name: 'BoardsList',
  components: {
    CategoriesList,
    Modal,
    BoardForm,
    draggable,
  },
  computed: {
    boards: {
      get() {
        return this.$store.getters.boards;
      },
      set(value) {
        this.$store.commit('updateBoards', value);
      },
    },
  },
  methods: {
    edit() {
      const selectedItem = _.find(
        this.$store.getters.boards,
        { id: this.$store.getters.activeBoardId },
      );

      this.$store.commit('toggle_board_modal', true);

      this.$nextTick(() => {
        BoardService.edit(selectedItem);
      });
    },
    switchBoard(id) {
      this.$store.commit('change_active_board_id', id);

      localStorage.setItem('active_board_id', id);

      BoardService.$emit('boardsChanged');
    },
    update() {
      // eslint-disable-next-line array-callback-return
      this.boards.map((board, index) => {
        this.$store.dispatch('boardSave', {
          url: `/boards/${board.id}`,
          method: 'put',
          // eslint-disable-next-line no-param-reassign
          sort: board.sort = index + 1,
        });
      });
    },
  },
  created() {
    BoardService.$on('boardsChanged', () => {
      if (BoardService.getActiveBoard() !== undefined) {
        const activeBoard = BoardService.getActiveBoard();

        this.$store.commit('updateCategories', activeBoard.categories);

        document.body.style.backgroundImage = `url('${activeBoard.image}')`;
        document.body.className = 'body_bg_image';
      }
    });

    BoardService.fetchBoards();
  },
};
</script>

<style>
.body_bg_image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
