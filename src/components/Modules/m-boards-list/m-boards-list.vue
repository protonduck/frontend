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
  <div v-if="boards" class="tabs is-centered is-boxed is-medium">
    <ul>
      <li
        v-for="board in boards"
        :key="board.id"
        @click="switchBoard(board.id)"
        :class="{ 'is-active': board.id === activeBoardId }"
      >
        <a>{{ board.name }}</a>
      </li>
    </ul>
  </div>
</template>
