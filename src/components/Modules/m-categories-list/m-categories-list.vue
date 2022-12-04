<script setup>
import { computed } from 'vue'
import { useBoardStore } from '@stores/boardStore';
import mLinksList from '@modules/m-links-list/m-links-list.vue';

const store = useBoardStore()
const categories = computed(() => store.getBoard(store.getActiveBoardId)?.categories)

if (localStorage.getItem('selectedBoardId')) {
  store.setActiveBoard(parseInt(localStorage.getItem('selectedBoardId'), 10));
}
</script>

<template>
  <div v-if="categories" class="m-categories-list">
    <div v-for="category in categories" :key="category.id">
      <div v-if="category.links.length" class="m-categories-list__container">
        <div class="m-categories-list__header">{{ category.name }}</div>
        <m-links-list v-if="category.links" :links="category.links" />  
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "@assets/scss/main.scss";

  .m-categories-list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: $spacing-20;
    margin-top: $spacing-20;

    @include breakpoint('s') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include breakpoint('m') {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .m-categories-list__header {
    display: flex;
    justify-content: space-between;
    background-color: $color-light--darken;
    padding: $spacing-15;
    opacity: 0.5;
  }

  .m-categories-list__container {
    border: 1px solid $color-light--darken;
    border-radius: 0.25rem;
  }
</style>
