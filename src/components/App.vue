<template>
  <div>
    <main-menu />

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MainMenu from './MainMenu.vue';

export default {
  components: {
    MainMenu,
  },
  created() {
    this.$http.interceptors.response.use(undefined, (err) => new Promise(() => {
      // eslint-disable-next-line no-underscore-dangle
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.$store.dispatch('logout');
      }
      throw err;
    }));
  },
};
</script>
