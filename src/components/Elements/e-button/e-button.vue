<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    type: {
      type: String,
      default: 'submit',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'primary',
    },
  })

  const classes = computed(() => [{
    'is-primary': props.layout === 'primary',
  }]);
</script>

<template>
  <div class="field">
    <div class="control">
      <button :type="type" :disabled="isDisabled" @click="$emit('click')" class="button" :class="classes">
        <slot />
      </button>
    </div>
  </div>
</template>
