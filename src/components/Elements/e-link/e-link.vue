<template>
  <a :href="href" :title="title" :target="target" :classes="classes" @click="$emit('click')" class="e-link">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'e-link',
  props: {
    href: {
      type: String,
      default: '#'
    },
    title: String,
    target: {
      type: String,
      default: '_self',
      validator: (value) => ['_blank', '_self'].includes(value)
    },
    classes: String
  },
  emit: ['click']
};
</script>

<style scoped lang="scss" src="./e-link.scss" />
