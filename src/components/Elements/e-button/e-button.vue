<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'submit',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  layout: {
    type: String,
    default: 'primary',
  },
});

defineEmits(['click']);

const classes = computed(() => [
  {
    'is-link': props.layout === 'primary',
    'is-link is-light': props.layout === 'link-light',
    'is-link is-danger': props.layout === 'link-danger',
    'is-link is-light is-danger': props.layout === 'link-light-danger',
    'is-text': props.layout === 'text',
  },
]);
</script>

<template>
  <div class="control">
    <button :type="type" :disabled="isDisabled" :class="classes" class="button" @click="$emit('click')">
      <slot />
    </button>
  </div>
</template>
