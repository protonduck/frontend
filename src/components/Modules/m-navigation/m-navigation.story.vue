<script setup>
import mNavigation from '@modules/m-navigation/m-navigation.vue';
import { ref } from 'vue';

const items = ref([
    { to: '/', name: 'menu.home', isLoggedIn: true, icon: 'fa-solid fa-home' },
    { to: '/login', name: 'menu.login', isLoggedIn: false, icon: 'fa-solid fa-right-to-bracket' },
    // { to: '/signup', name:'menu.signup', isLoggedIn: false }
  ]);
</script>

<template>
  <Story title="Modules/Navigation">
    <m-navigation :items="items" />
  </Story>
</template>
