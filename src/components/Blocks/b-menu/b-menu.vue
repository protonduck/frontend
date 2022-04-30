<template>
  <div>
    <m-menu :menu="menu" :isLoggedIn="isLoggedIn">
      <template v-if="isLoggedIn" #slot1>
        <a class="btn btn-outline-danger btn-sm" href="#" @click.prevent="logout">
          {{ $t('menu.logout') }}
        </a>
      </template>
      <template #slot2>
        <change-language />
      </template>
    </m-menu>
  </div>
</template>

<script>
import mMenu from '../../Modules/m-menu/m-menu.vue';
import changeLanguage from '../../Modules/m-change-language/m-change-language.vue';

export default {
  name: 'b-menu',
  components: {
    mMenu,
    changeLanguage,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    menu() {
      return {
        items: [
          {
            name: 'home',
            label: this.$t('menu.boards'),
            classes: 'btn btn-outline-success btn-sm',
            isLoggedIn: true,
          },
          {
            name: 'login',
            label: this.$t('menu.login'),
            classes: 'btn btn-outline-success btn-sm',
            isLoggedIn: false,
          },
          {
            name: 'signup',
            label: this.$t('menu.signup'),
            classes: 'btn btn-outline-primary btn-sm',
            isLoggedIn: false,
          },
        ],
      };
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => { this.$router.push('/login'); });
    },
  },
};
</script>
