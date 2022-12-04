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
    <header class="has-background-link">
      <m-navigation :items="items" />
    </header>
    <div class="container mt-4">
      <RouterView />
    </div>
  <footer class="footer has-background-white">
    <div class="content has-text-centered">
      <p>
        Open Source <strong>Bookmark Manager Frontend</strong> by <a href="https://github.com/protonduck">ProtonDuck</a><br />
        Made with love in <a href="https://vuejs.org">Vue.js</a> & <a href="https://bulma.io">Bulma CSS-Framework</a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss">

</style>
