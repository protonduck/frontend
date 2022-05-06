<template>
  <div>
    <div class="boards mb-3">
      <nav>
        <div class="d-flex">
          <draggable v-model="boards" class="nav nav-pills" group="boards" @change="update()">
            <e-link
              v-for="(board) in boards"
              :key="board.id"
              :class="{ active: board.id === $store.getters.activeBoardId }"
              @click="switchBoard(board.id)"
              class="nav-item nav-link"
            >
              {{ board.name }}
             </e-link>
          </draggable>

          <div class="nav nav-pills">
            <e-link class="nav-item nav-link" @click="$store.commit('toggle_board_modal', true)">
              <i class="fa fa-plus" />
            </e-link>

            <e-link class="nav-item nav-link" @click="edit" v-if="boards.length">
              <i class="fa fa-edit" />
            </e-link>
          </div>
        </div>
      </nav>
    </div>

    <e-modal v-if="$store.getters.showBoardModal">
      <board-form />
    </e-modal>

    <categories-list />
  </div>
</template>

<script>
import _ from 'lodash';
import draggable from 'vuedraggable';
import CategoriesList from '../category/List.vue';
import eModal from '../../components/Elements/e-modal/e-modal.vue';
import eLink from '../../components/Elements/e-link/e-link.vue';
import BoardForm from './Form.vue';
import bus from '../../bus';

export default {
  name: 'BoardsList',
  components: {
    CategoriesList,
    eModal,
    eLink,
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
        bus.edit('edit-board', selectedItem);
      });
    },
    switchBoard(id) {
      this.$store.commit('change_active_board_id', id);

      localStorage.setItem('active_board_id', id);

      bus.edit('board-changed');
    },
    update() {
      // eslint-disable-next-line array-callback-return
      this.boards.map((board, index) => {
        this.$store.dispatch('save', {
          api_url: `/boards/${board.id}`,
          method: 'put',
          data: {
            // eslint-disable-next-line no-param-reassign
            sort: board.sort = index + 1,
          },
        });
      });
    },
  },
  created() {
    bus.$on('board-changed', () => {
      const activeBoard = _.find(
        this.$store.getters.boards,
        { id: this.$store.getters.activeBoardId },
      );

      if (activeBoard !== undefined) {
        this.$store.commit('updateCategories', activeBoard.categories);

        document.body.style.backgroundImage = `url('${activeBoard.image}')`;
        document.body.className = 'body_bg_image';
      }
    });

    bus.fetchBoards();
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
