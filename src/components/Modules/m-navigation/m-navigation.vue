<script setup>
import { ref, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router'
import mLanguageSelect from '@modules/m-language-select/m-language-select.vue';

const props = defineProps({
  items: Array,
})

const isOpen = ref(false);

const route = useRoute();
const path = computed(() => route.path);
</script>

<template>
  <div class="m-navigation">
    <nav class="m-navigation__wrapper">
      <div class="m-navigation__toggle" @click="isOpen = !isOpen">
        {{ !isOpen ? 'open icon' : 'close icon' }}
      </div>

      <div class="m-navigation__items" :class="{ 'm-navigation__items--hidden': !isOpen }">
        <template v-for="item in items" :key="item.name">
          <router-link :to="item.to" class="m-navigation__item" :class="{ 'm-navigation__item--active': path === item.to }">
            {{ $t(item.name) }}
          </router-link>
        </template>

        <m-language-select class="m-navigation__item m-navigation__item--language" />
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@import "@assets/scss/main.scss";

.m-navigation {
  background-color: $color-primary;
  padding: $spacing-10;
  
}

.m-navigation__wrapper {
  max-width: $max-width-100;
  margin: 0 auto;
}

.m-navigation__toggle {
  display: flex;
  flex-direction: column;
  align-items: center;

  @include breakpoint('s') {
    display: none;
  }
}

.m-navigation__items {
  display: flex;
  flex-direction: column;

  @include breakpoint('s') {
    flex-direction: row;
  }

  a {
    color: $color-white;
    text-decoration: none;
    font-size: $size-15;

    &:hover {
      background: $color-secondary;
      border-radius: $spacing-5;
      cursor: pointer;
    }
  }

  .m-navigation__item {
    margin: $spacing-5;
    padding: $spacing-10;
  }

  .m-navigation__item--active {
    background: $color-secondary;
    border-radius: $spacing-5;
    cursor: pointer;
  }

  .m-navigation__item--language {
    background: $color-secondary;
    border: none;
    border-radius: $spacing-5;
    color: $color-white;
  }
}

.m-navigation__items--hidden {
  display: none;

  @include breakpoint('s') {
    display: flex;
  }
}
</style>