<script setup>
import mNavigation from '@modules/m-navigation/m-navigation.vue';
import { ref } from 'vue';

const items = ref([
  { to: '/', name: 'menu.home' },
  { to: '/login', name: 'menu.login' },
  { to: '/signup', name:'menu.signup' }
]);
</script>

<template>
  <Story title="Modules/Navigation">
    <m-navigation :items="items" />
  </Story>
</template>
