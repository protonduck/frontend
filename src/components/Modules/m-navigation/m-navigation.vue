<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@stores/userStore';
import mLanguageSelect from '@modules/m-language-select/m-language-select.vue';
import mExport from '@modules/m-export/m-export.vue';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  items: Array,
});

function filtredItems() {
  return props.items.filter((item) => item.isLoggedIn === userStore.isLoggedIn);
}

async function logoutUser() {
  userStore.logoutUser();
  router.push({ name: 'login' });
}

const isOpen = ref(false);
</script>

<template>
  <nav class="navbar is-link is-spaced container pl-0 pr-0" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        data-target="burgerNavigation"
        :aria-expanded="false"
        @click="isOpen = !isOpen"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="burgerNavigation" class="navbar-menu" :class="{ 'is-active': isOpen }">
      <div class="navbar-start">
        <template v-for="item in filtredItems()" :key="item.name">
          <router-link :to="item.to" active-class="is-active" class="navbar-item mr-3">
            <span v-if="item.icon" class="icon pr-3">
              <font-awesome-icon :icon="item.icon" />
            </span>
            <span>{{ $t(item.name) }}</span>
          </router-link>
        </template>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <m-export v-if="userStore.isLoggedIn && route.name === 'home'" />
          <m-language-select class="navbar-item" />
          <div class="buttons">
            <a v-if="userStore.isLoggedIn" @click="logoutUser()" class="button">
              <span class="icon pr-3">
                <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
              </span>
              <span>{{ $t('menu.logout') }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
