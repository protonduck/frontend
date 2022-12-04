<script setup>
  import mBoardsList from '@modules/m-boards-list/m-boards-list.vue';
  import mCategoriesList from '@modules/m-categories-list/m-categories-list.vue';
</script>

<template>
  <div class="home">
    <m-boards-list />
    <m-categories-list />
  </div>
</template>

<style lang="scss" scoped>
  @import "@assets/scss/main.scss";

  .home {
    margin: $spacing-20;
  }
</style>
