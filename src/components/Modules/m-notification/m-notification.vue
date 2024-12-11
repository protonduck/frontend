<script setup>
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
  },
  layout: {
    type: String,
    default: 'danger',
  },
});

const classes = computed(() => [
  {
    'is-danger': props.layout === 'danger',
    'is-warning': props.layout === 'warning',
  },
]);
</script>

<template>
  <div v-if="message" class="notification is-light" :class="classes">
    {{ message }}
  </div>
</template>
