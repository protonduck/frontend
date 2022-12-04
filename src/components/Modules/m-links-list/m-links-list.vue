<script setup>
  const props = defineProps({
    links: Array,
  });

  function favicon(link) {
    return link.favicon ? link.favicon : `https://www.google.com/s2/favicons?domain=${link.url}`;
  }
</script>

<template>
  <div v-if="links" v-for="link in links" :key="links.id" class="panel-block p-3">
    <span class="panel-icon">
      <img :src="favicon(link)" alt="" height="16" width="16" />
    </span>
    <a :href="link.url" :title="link.description" target="_blank">
      {{ link.title }}
    </a>
  </div>
</template>
