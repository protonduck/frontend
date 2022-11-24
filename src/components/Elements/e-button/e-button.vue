<template>
  <button :id="id" :type="type" :disabled="isDisabled" :class="classes" @click="$emit('click')" class="btn mr-2">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'e-button',
  props: {
    id: String,
    type: {
      type: String,
      default: 'submit',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default: 'btn-primary'
    }
  },
  emit: ['click']
};
</script>

<style scoped lang="scss" src="./e-button.scss" />
