<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  layout: {
    type: String,
    default: 'danger',
  },
});

const classes = computed(() => [
  {
    'is-danger': props.layout === 'danger',
  },
]);
</script>

<template>
  <div v-if="item.length !== 0" class="notification is-light" :class="classes">
    {{ item.status }} - {{ item.message }}
  </div>
</template>
