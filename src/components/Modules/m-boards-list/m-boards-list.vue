<script setup>
  import { computed } from 'vue'
  import { useBoardStore } from '@stores/boardStore';

  const boardStore = useBoardStore();

  boardStore.fetchBoards();

  const boards = computed(() => boardStore.getAll);
  const activeBoardId = computed(() => boardStore.getActiveBoardId);

  function switchBoard(selectedBoardId) {
    boardStore.setActiveBoard(selectedBoardId);
    localStorage.setItem('selectedBoardId', selectedBoardId);
  }

  if (localStorage.getItem('selectedBoardId')) {
    boardStore.setActiveBoard(parseInt(localStorage.getItem('selectedBoardId'), 10));
  }
</script>

<template>
  <div v-if="boards" class="m-boards-list">
    <div
      v-for="board in boards"
      :key="board.id"
      @click="switchBoard(board.id)"
      :class="{ 'm-boards-list__item--active': board.id === activeBoardId }"
      class="m-boards-list__item"
    >
      {{ board.name }}
    </div>
  </div>
</template>

<style lang="scss">
  @import "@assets/scss/main.scss";

  .m-boards-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: $spacing-20;
  }

  .m-boards-list__item {
    padding: $spacing-10 $spacing-20;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
      color: $color-blue;
    }
  }

  .m-boards-list__item--active {
    padding: $spacing-10 $spacing-20;
    background: $color-blue--lighten;
    color: $color-white;
    border-radius: $spacing-5;
    text-decoration: none;

    &:hover {
      text-decoration: none;
      background: $color-blue;
      color: $color-white;
    }
  }
</style>
