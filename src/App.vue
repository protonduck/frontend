<script setup>
  import { RouterView } from 'vue-router'
  import { ref } from 'vue';
  import mNavigation from '@modules/m-navigation/m-navigation.vue';

  const items = ref([
    { to: '/', name: 'menu.home', isLoggedIn: true },
    { to: '/login', name: 'menu.login', isLoggedIn: false },
    // { to: '/signup', name:'menu.signup', isLoggedIn: false }
  ]);
</script>

<template>
  <header>
    <m-navigation :items="items" />
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="scss">
  @import "@assets/scss/main.scss";

  .container {
    max-width: $max-width-100;
    margin: 0 auto;
  }
</style>
