<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LanguageSelect from '@modules/m-language-select/m-language-select.vue'
</script>

<template>
  <header>
    <nav>
      <language-select />
      <RouterLink to="/login">{{ $t('menu.login') }}</RouterLink>
      <RouterLink to="/signup">{{ $t('menu.signup') }}</RouterLink>
      <RouterLink to="/">{{ $t('menu.home') }}</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss">
  @import "./assets/scss/main.scss";
</style>
