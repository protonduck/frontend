<template>
  <span>
    <span v-show="state === true">
      <span aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
      <span class="sr-only">Loading...</span>
    </span>
    <span v-show="state === false">
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
  name: 'e-spinner',
  props: {
    state: Boolean,
    // eslint-disable-next-line vue/require-prop-type-constructor
    default: false,
  },
};
</script>
