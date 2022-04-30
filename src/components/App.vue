<template>
  <div>
    <b-menu />

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import bMenu from './Blocks/b-menu/b-menu.vue';

export default {
  name: 'app',
  components: {
    bMenu,
  },
};
</script>
