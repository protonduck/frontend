<script setup>
  const props = defineProps({
    links: Array,
  });

  function favicon(link) {
    return link.favicon ? link.favicon : `https://www.google.com/s2/favicons?domain=${link.url}`;
  }
</script>

<template>
  <div v-if="links" class="m-links-list">
    <div v-for="link in links" :key="links.id" class="m-links-list__item">
      <span class="m-links-list__img">
        <img :src="favicon(link)" alt="" height="16" width="16" />
      </span>
      <a :href="link.url" :title="link.description">{{ link.title }}</a>
    </div>
  </div>
</template>

<style lang="scss">
  @import "@assets/scss/main.scss";

  .m-links-list__item {
    padding: $spacing-10 $spacing-20;
    border-bottom: solid 1px $color-light--darken;

    a {
      color: $color-blue;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .m-links-list__item:last-of-type {
    border-bottom: solid 1px transparent;
  }

  .m-links-list__img {
    padding-right: $spacing-20;
  }
</style>
