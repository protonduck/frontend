<script setup>
import { RouterView } from 'vue-router';
import { ref } from 'vue';
import mNavigation from '@modules/m-navigation/m-navigation.vue';

const items = ref([
  { to: '/', name: 'menu.home', isLoggedIn: true, icon: 'fa-solid fa-home' },
  { to: '/stats', name: 'menu.stats', isLoggedIn: true, icon: 'fa-solid fa-chart-pie' },
  { to: '/login', name: 'menu.login', isLoggedIn: false, icon: 'fa-solid fa-right-to-bracket' },
  { to: '/register', name: 'menu.register', isLoggedIn: false, icon: 'fa-solid fa-user-plus' },
]);
</script>

<template>
  <header class="has-background-link">
    <m-navigation :items="items" />
  </header>
  <div class="container">
    <RouterView />
  </div>
  <footer class="footer has-background-white">
    <div class="content has-text-centered">
      <p>
        Open Source <strong>Bookmark Manager Frontend</strong> by
        <a href="https://github.com/protonduck" target="_blank">ProtonDuck</a><br />
        Made with <font-awesome-icon icon="fa-solid fa-heart" /> in
        <a href="https://vuejs.org" target="_blank">Vue.js</a> &
        <a href="https://bulma.io" target="_blank">Bulma CSS-Framework</a>
      </p>
    </div>
  </footer>
</template>
