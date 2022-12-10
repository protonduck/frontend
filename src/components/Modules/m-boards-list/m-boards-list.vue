<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useBoardStore } from '@stores/boardStore';
import storage from '@plugins/storage';
import mAddBoard from '@modules/m-add-board/m-add-board.vue';
import mRemoveBoard from '@modules/m-remove-board/m-remove-board.vue';
import mEditBoard from '@modules/m-edit-board/m-edit-board.vue';

const boardStore = useBoardStore();
const { boards, activeBoardId } = storeToRefs(useBoardStore());

onMounted(() => {
  boardStore.fetchBoards();
});

function switchBoard(selectedBoardId) {
  boardStore.setActiveBoard(selectedBoardId);
}

if (storage.getItem('selectedBoardId')) {
  boardStore.setActiveBoard(parseInt(storage.getItem('selectedBoardId'), 10));
}
</script>

<template>
  <div class="tabs is-centered is-boxed is-medium">
    <ul>
      <li
        v-if="boards.length"
        v-for="board in boards"
        :key="board.id"
        @click="switchBoard(board.id)"
        :class="{ 'is-active': board.id === activeBoardId }"
      >
        <a>{{ board.name }}</a>
      </li>
      <m-add-board />
      <m-edit-board v-if="activeBoardId" />
      <m-remove-board v-if="activeBoardId" />
    </ul>
  </div>
  <div v-if="boards.length === 0" class="notification is-warning is-light">
    {{ $t('site.boardsList.info') }}
  </div>
</template>
