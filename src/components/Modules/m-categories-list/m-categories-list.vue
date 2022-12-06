<script setup>
import { computed } from 'vue'
import { useBoardStore } from '@stores/boardStore';
import mLinksList from '@modules/m-links-list/m-links-list.vue';
import storage from '@plugins/storage';

const store = useBoardStore()
const categories = computed(() => store.getBoard(store.getActiveBoardId)?.categories)

if (storage.getItem('selectedBoardId')) {
  store.setActiveBoard(parseInt(storage.getItem('selectedBoardId'), 10));
}
</script>

<template>
  <div v-if="categories" class="columns is-multiline">
    <div v-for="category in categories" :key="category.id" class="column is-3">
      <div class="panel">
        <header v-if="category.links.length" class="panel-heading p-1">
          <div class="card-header-title">{{ category.name }}</div>
        </header>
        <m-links-list v-if="category.links" :links="category.links" />
      </div>
    </div>
  </div>
</template>
