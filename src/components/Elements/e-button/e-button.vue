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
    'e-element--primary': props.layout === 'primary',
  }]);
</script>

<template>
  <div class="e-button">
    <div class="e-button__wrapper">
      <button :type="type" :disabled="isDisabled" @click="$emit('click')" class="e-button__element" :class="classes">
        <slot />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "@assets/scss/main.scss";

  .e-button__wrapper {
    margin-top: $spacing-30;
    overflow: hidden;
  }

  .e-button__element {
    display: inline-flex;
    justify-content: center;
    padding: $spacing-15 $spacing-30;
    border-radius: $spacing-5;
    font-size: $size-15;
    transition: background-color .15s ease-in-out, border-color .15s ease-in-out;

    &:hover {
      cursor: pointer;
    }
  }

  .e-element--primary {
    background: $color-blue;
    border: 1px solid $color-blue;
    color: $color-white;

    &:hover {
      background-color: $color-blue--darken;
    }
  }
</style>
